/**
 * product controller
 */

import { factories } from '@strapi/strapi';
import { enrichWithWishlist } from '../services/wishlist-helper';

export default factories.createCoreController('api::product.product', ({ strapi }) => ({
  async find(ctx) {
    // Get the default response (all products)
    let products = await super.find(ctx);

    const userId = ctx.state.userId;
    const brandId = ctx.request.header['brand-id'];
    products.data = await enrichWithWishlist(products.data, userId, brandId);
    return products;
  },

  async findOne(ctx) {
    const { id: pid } = ctx.params; // Get PID from the URL

    // Call the custom service method to get the product by PID
    const product = await strapi.service('api::product.product').findByPid(pid, ctx.query);
    // Call pdp page configs
    const pdpPage = await strapi.service('api::pdp-page.pdp-page').find({ locale: ctx.query.locale });
    if (!product) {
      return ctx.notFound('Product not found');
    }

    const userId = ctx.state.userId;
    const brandId = ctx.request.header['brand-id'];

    const enrichedProduct = await enrichWithWishlist([product], userId, brandId);

    return {
      ...enrichedProduct[0],
      ...pdpPage
    };
  },
}));
