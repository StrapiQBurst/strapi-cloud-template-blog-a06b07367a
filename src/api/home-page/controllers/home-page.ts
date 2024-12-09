/**
 * home-page controller
 */

import { factories } from '@strapi/strapi';
import { enrichWithWishlist } from '../../product/services/wishlist-helper';


export default factories.createCoreController('api::home-page.home-page', ({ strapi }) => ({
    async find(ctx) {
        let homepage = await super.find(ctx);
        let products = homepage?.data[0]?.attributes?.featuredProducts?.products?.data;
        const userId = ctx.state.userId;
        const brandId = ctx.request.header['brand-id'];
        products = await enrichWithWishlist(products, userId, brandId);
        products = products.map(product => ({
            ...product.attributes,
            isWishlisted: product.isWishlisted
        }))
        homepage.data[0].attributes.featuredProducts.products.data = products;
        return homepage;
      },
}));
