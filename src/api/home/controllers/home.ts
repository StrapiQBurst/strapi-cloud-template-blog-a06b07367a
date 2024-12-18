import { factories } from '@strapi/strapi';
import { enrichWithWishlist } from '../../product/services/wishlist-helper';

export default factories.createCoreController('api::home.home', ({ strapi }) => ({
  async find(ctx) {
    // Call the default core find method to get the data
    const { data, meta } = await super.find(ctx);

    // Retrieve userId and brandId from the context or request headers/query
    const userId = ctx.state.userId; // User ID from JWT if available
    const brandId = ctx.request.header['brand-id'];

    // Process blocks in the response
    for (const block of data[0]?.blocks || []) {

      if (block.__component === 'product-collection.product-collection') {
        const products = block.products || [];
        // Enrich products with 'isWishlisted'
        const enrichedProducts = await enrichWithWishlist(products, userId, brandId, true);

        // Replace the original products with enriched ones
        block.products = enrichedProducts;
      }
    }

    // Return the updated response
    return { data, meta };
  },
}));
