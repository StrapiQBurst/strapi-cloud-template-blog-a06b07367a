/**
 * suggestion controller
 */

import { factories } from '@strapi/strapi'
import { enrichWithWishlist } from '../../product/services/wishlist-helper';
import product from '../../product/controllers/product';

export default factories.createCoreController('api::suggestion.suggestion', ({ strapi }) => ({
    async findOne(ctx) {
      let suggestions = await super.findOne(ctx);
  
      const userId = ctx.state.userId;
      const brandId = ctx.request.header['brand-id'];
      const productData = suggestions.data.attributes.products.data.map(product => product.attributes);
      suggestions.data.attributes.products.data = await enrichWithWishlist(productData, userId, brandId);
      return suggestions;
    },
}));
