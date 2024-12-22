import { factories } from '@strapi/strapi';
import { enrichWithWishlist } from '../../product/services/wishlist-helper';

export default factories.createCoreController('api::wishlist.wishlist', ({ strapi }) => ({
  async upsert(ctx) {
    const { users, products, brand } = ctx.request.body;

    if (!users || !products || !brand) {
      return ctx.badRequest('Missing required fields: users, products, or brand');
    }

    try {
      let wishlist = await strapi.documents('api::wishlist.wishlist').findFirst({
        filters: {
          users: { userId: users },
          brand: { brandId: brand }
        },
        populate: ['products', 'brand']
      });

      if (!wishlist) {
        const userRecord = await strapi.documents('api::line-user.line-user').findFirst({
          filters: { userId: users }
        });

        if (!userRecord) {
          return ctx.badRequest(`User with userId ${users} not found`);
        }

        const productRecord = await strapi.documents('api::product.product').findFirst({
          filters: { pid: products },
        });

        if (!productRecord) {
          return ctx.badRequest('Some products not found');
        }

        const selectedBrand = await strapi.documents('api::brand.brand').findFirst({
          filters: { brandId: brand },
        });

        wishlist = await strapi.documents('api::wishlist.wishlist').create({
          data: {
            users:userRecord.documentId,
            brand: selectedBrand.documentId,
            products: {connect: [{documentId: productRecord.documentId}] },
          },
        });
        await strapi.documents('api::wishlist.wishlist').publish({
          documentId: wishlist.documentId});
      } else {
        const productRecord = await strapi.db.query('api::product.product').findOne({
          where: { pid: products },
        });

        if (!productRecord) {
          return ctx.badRequest('Some products not found');
        }

        wishlist = await strapi.documents('api::wishlist.wishlist').update({
          documentId: wishlist.documentId,
          data: {
            products: { connect: [{documentId: productRecord.documentId}] },
          },
        });

        await strapi.documents('api::wishlist.wishlist').publish({
          documentId: wishlist.documentId,
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
      let wishlist = await strapi.documents('api::wishlist.wishlist').findFirst({
        filters: {
          users: { userId: users },
          brand: { brandId: brand }
        },
        populate: ['products']
      });

      if (!wishlist) {
        return ctx.notFound('Wishlist not found for the given user and brand');
      }

      const productToDelete = wishlist.products.find(product => product.pid === products);
      if (!productToDelete) {
        return ctx.notFound(`Wishlist does not contain the product ${products}`);
      }

      wishlist = await strapi.documents('api::wishlist.wishlist').update({
        documentId: wishlist.documentId,
        data: {
          products: { disconnect: [{documentId: productToDelete?.documentId}] },
        },
      });

      await strapi.documents('api::wishlist.wishlist').publish({
        documentId: wishlist.documentId,
      });

      ctx.body = wishlist;
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

      const localizedProducts = await strapi.documents('api::product.product').findMany({
        filters: {
          pid: { $in: wishlistedProductIds },
          locale: locale
        },
        populate: ['mainCategory', 'category', 'subCategory', 'brand']
      });

      const temp =await enrichWithWishlist(localizedProducts, userId, brandId);

      wishlist.data[0].attributes.products.data = temp;
      return wishlist;
    } catch (e) {
      return { data: [] }
    }
  },
}));
