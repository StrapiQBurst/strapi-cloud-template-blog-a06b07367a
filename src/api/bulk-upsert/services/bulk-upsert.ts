export default () => ({
    async bulkUpsertProducts(products: Array<any>) {
        const existingProducts = await strapi.db.query('api::product.product').findMany({
            where: {
                PID: { $in: products.map(product => product.pid) }  // Find existing products by PID
            }
        });

        // Get PIDs of existing products
        const existingPIDs = existingProducts.map(product => product.pid);

        // Split products into ones to update and ones to create
        const productsToUpdate = products.filter(product => existingPIDs.includes(product.pid));
        const productsToCreate = products.filter(product => !existingPIDs.includes(product.pid));

        await Promise.all(
            productsToUpdate.map(async (product) => {
                try {
                    await strapi.db.query('api::product.product').update({
                        where: { pid: product.pid },
                        data: product
                    });
                } catch (error) {
                    console.error(`Error updating product with PID: ${product.pid}`, error);
                }
            })

        );


        // create new products
        if (productsToCreate.length > 0) {
            try {
                for (const product of productsToCreate) {
                    await strapi.db.query('api::product.product').create({
                        data: {
                            ...product,
                            publishedAt: new Date()
                        },
                    });
                }
            } catch (error) {
                console.error('Error creating products:', error);
            }
        }

        return { updated: productsToUpdate.length, created: productsToCreate.length };
    }
});
