export default (config, { strapi }) => {
    return async (ctx, next) => {
      if (!ctx.query.populate) {
        ctx.query.populate = {
          blocks: {
            populate: {
              media: true, // Populate media in dynamic zone
              button: true, // Populate buttons
              products: {
                populate: {
                  data: true, // Populate products data
                  attributes: true, // Populate attributes of products
                },
              },
            },
          },
        };
      }
      await next();
    };
  };
  