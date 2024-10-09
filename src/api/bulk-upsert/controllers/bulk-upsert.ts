export default {
  bulkUpsert: async (ctx, next) => {
    const products = ctx.request.body.data;  // Get the array of products from the request body

    if (!products || !Array.isArray(products)) {
      return ctx.badRequest('Invalid data. Expected an array of products.');
    }

    try {
      // Call the bulk update service
      const result = await strapi.service('api::bulk-upsert.bulk-upsert').bulkUpsertProducts(products);
      
      // Send back the result
      ctx.send(result);
    } catch (error) {
      ctx.throw(400, error);  // Handle any errors that occur during the update
    }
  }
};
