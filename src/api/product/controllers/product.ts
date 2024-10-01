/**
 * product controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::product.product', ({ strapi }) => ({
    async findOne(ctx) {
        const { id: pid } = ctx.params; // Get PID from the URL
    
        // Call the custom service method to get the product by PID
        const product = await strapi.service('api::product.product').findByPid(pid, ctx.query);
        // Call pdp page configs
        const pdpPage = await strapi.service('api::pdp-page.pdp-page').find({locale: ctx.query.locale});
        if (!product) {
          return ctx.notFound('Product not found');
        }
    
        return {
            ...product,
            ...pdpPage
        };
      },
  }));
