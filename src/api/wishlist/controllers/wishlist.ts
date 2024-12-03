import { factories } from '@strapi/strapi';
import { enrichWithWishlist } from '../../product/services/wishlist-helper';

export default factories.createCoreController('api::wishlist.wishlist', ({ strapi }) => ({
  async upsert(ctx) {
    const { users, products, brand } = ctx.request.body;

    if (!users || !products || !brand) {
      return ctx.badRequest('Missing required fields: users, products, or brand');
    }

    try {
      let wishlist = await strapi.db.query('api::wishlist.wishlist').findOne({
        where: { users: { userId: users }, brand: { brandId: brand } },
        populate: ['products', 'brand'],
      });

      if (!wishlist) {
        const userRecord = await strapi.db.query('api::line-user.line-user').findOne({
          where: { userId: users },
        });

        if (!userRecord) {
          return ctx.badRequest(`User with userId ${users} not found`);
        }

        const productRecord = await strapi.db.query('api::product.product').findOne({
          where: { pid: products },
        });

        if (!productRecord) {
          return ctx.badRequest('Some products not found');
        }

        const selectedBrand = await strapi.db.query('api::brand.brand').findOne({
          where: { brandId: brand },
        });

        wishlist = await strapi.db.query('api::wishlist.wishlist').create({
          data: {
            users: userRecord.id,
            products: productRecord.id,
            brand: selectedBrand.id,
            publishedAt: new Date(),
          },
        });
      } else {
        const existingProductIds = wishlist.products.map(product => product.id);
        const productRecord = await strapi.db.query('api::product.product').findOne({
          where: { pid: products },
        });

        if (!productRecord) {
          return ctx.badRequest('Some products not found');
        }

        if (!existingProductIds.includes(productRecord.id)) {
          existingProductIds.push(productRecord.id);
        }

        wishlist = await strapi.db.query('api::wishlist.wishlist').update({
          where: { id: wishlist.id },
          data: {
            products: existingProductIds,
          },
        });
      }

      ctx.body = wishlist;
    } catch (error) {
      strapi.log.error('Error in wishlist upsert:', error);
      ctx.throw(500, 'Something went wrong', { error });
    }
  },

  async remove(ctx) {
    const { users, products, brand } = ctx.query;

    if (!users || !products || !brand) {
      return ctx.badRequest('Missing required fields: users, products, or brand');
    }

    try {
      const wishlist = await strapi.db.query('api::wishlist.wishlist').findOne({
        where: { users: { userId: users }, brand: { brandId: brand } },
        populate: ['products'],
      });

      if (!wishlist) {
        return ctx.notFound('Wishlist not found for the given user and brand');
      }

      const remainingProducts = wishlist.products.filter(product => product.pid !== products);

      const updatedWishlist = await strapi.db.query('api::wishlist.wishlist').update({
        where: { id: wishlist.id },
        data: {
          products: remainingProducts.map(product => product.id),
        },
      });

      ctx.body = updatedWishlist;
    } catch (error) {
      strapi.log.error('Error in wishlist remove:', error);
      ctx.throw(500, 'Something went wrong', { error });
    }
  },
  async find(ctx) {
    try {

      let wishlist = await super.find(ctx);

      const userId = ctx.state.userId;
      const brandId = ctx.request.header['brand-id'];
      const { locale } = ctx.request.query;
      const wishlistedProductIds = wishlist.data.flatMap(item => item.attributes.products.data.map(product => product.attributes.pid));
      const localizedProducts = await strapi.db.query('api::product.product').findMany({
        where: { pid: { $in: wishlistedProductIds }, locale },
        populate: {
          mainCategory: true,
          category: true,
          subCategory: true,
          brand: true,
        },
      });

      wishlist.data[0].attributes.products.data = await enrichWithWishlist(localizedProducts, userId, brandId);
      return wishlist;
    } catch (e) {
      return { data: [] }
    }
  },
}));
