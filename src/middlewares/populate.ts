module.exports = (config, { strapi }) => {
    return async (ctx, next) => {
      if (!ctx.query.populate) {
        ctx.query.populate = {
          blocks: {
            populate: {
              media: true,
              button: true,
              products: { populate: true },
            },
          },
        };
      }
      await next();
    };
  };