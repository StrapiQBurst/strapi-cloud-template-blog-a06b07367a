/**
 * product service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::product.product', ({ strapi }) => ({
    // Custom service to find product by PID and populate PLP content
    async findByPid(pid, queryParams) {
        // Extract query parameters
        const { locale, populate } = queryParams;
        // Build the query object dynamically based on the params
        const query = {
          where: {
            pid,
            ...(locale && { locale }), // Conditionally add locale if it exists
          },
          populate: {
            ...populate,
          },
        };
        // Execute the query with the constructed query object
        const product = await strapi.db.query('api::product.product').findOne(query);
    
        // Return the product or null if not found
        return product;
      },
  }));