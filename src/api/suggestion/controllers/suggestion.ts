/**
 * suggestion controller
 */

import { factories } from '@strapi/strapi'
import { enrichWithWishlist } from '../../product/services/wishlist-helper';

export default factories.createCoreController('api::suggestion.suggestion', ({ strapi }) => ({
    async findOne(ctx) {
      let suggestions = await super.findOne(ctx);
  
      const userId = ctx.state.userId;
      const brandId = ctx.request.header['brand-id'];
      suggestions.data.attributes.products.data = await enrichWithWishlist(suggestions.data.attributes.products.data, userId, brandId);
      return suggestions;
    },
}));
