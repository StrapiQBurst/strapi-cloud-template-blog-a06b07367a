export default (config, { strapi }) => {
    return async (ctx, next) => {
        const userIdHeader = ctx.request.header['x-user-id'];

        if (userIdHeader) {
            try {
                const user = await strapi.db.query('api::line-user.line-user').findOne({
                    where: { userId: userIdHeader, publishedAt: { $ne: null } },  // Use the default `id` here
                });
                if (user) {
                    ctx.state.username = user.name;
                    ctx.state.userId = user.userId;

                } else {
                    ctx.badRequest('Invalid user ID');
                }
            } catch (err) {
                ctx.badRequest('Error validating user ID');
            }
        } else {
            ctx.state.userId = null;
            ctx.state.username = "Guest";
        }

        await next();
    };
};
