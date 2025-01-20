export default () => ({
    async bulkUpsertProducts(products: Array<any>) {
        try {
            async function fetchOrCreate(entity, values) {
                const existingEntities = await strapi.db.query(`api::${entity}.${entity}`).findMany({
                    where: { name: { $in: values } }
                });

                const existingMap = existingEntities.reduce((map, item) => {
                    map[item.name] = item.id;
                    return map;
                }, {});

                const newValues = values.filter(value => !existingMap[value]);

                if (newValues.length > 0) {
                    for (const value of newValues) {
                        const createdEntity = await strapi.db.query(`api::${entity}.${entity}`).create({
                            data: {
                                name: value,
                                publishedAt: new Date(),
                            }
                        });

                        existingMap[value] = createdEntity.id;
                    }
                }

                return existingMap;
            }

            // Helper function to fetch or create subcategories with category relationship
            async function fetchOrCreateSubcategories(subcategories, categoryMap) {
                try{
                console.log("sub...", subcategories, categoryMap)
                // const existingSubcategories = await strapi.db.query('api::subcategory.subcategory').findMany({
                //     where: {
                //         $or: subcategories.map(subcategory => ({
                //             name: subcategory.name,
                //             category: categoryMap[subcategory.category]
                //         }))
                //     },
                //     populate: ['category']
                // });
                const existingSubcategories = await strapi.documents('api::subcategory.subcategory').findMany({
                    filters: {
                      $or: subcategories.map(subcategory => ({
                        name: subcategory.name,
                        // category: categoryMap[subcategory.category]
                      }))
                    },
                    populate: {
                      category: true
                    }
                  });

                console.log("existing sub", existingSubcategories)

                const existingMap = existingSubcategories.reduce((map, subcategory) => {
                    map[`${subcategory.name}_${subcategory.category[0].name}`] = subcategory.id;
                    return map;
                }, {});

                const newSubcategories = subcategories.filter(subcategory =>
                    !existingMap[`${subcategory.name}_${subcategory.category}`]
                );

                console.log("newSubcategories.length", newSubcategories.length)

                if (newSubcategories.length > 0) {
                    for (const subcategory of newSubcategories) {
                        // Create each subcategory one by one to ensure relational field (category) is handled
                        const createdSubcategory = await strapi.db.query('api::subcategory.subcategory').create({
                            data: {
                                name: subcategory.name,
                                category: categoryMap[subcategory.category],
                                publishedAt: new Date(),
                            }
                        });

                        // Add the created subcategory to the existingMap
                        existingMap[`${subcategory.name}_${subcategory.category}`] = createdSubcategory.id;
                    }
                }
                return existingMap;
            }
            catch(e){
                console.log("error...", e)
            }
            }
            console.log("Service.............................")

            const { brandsSet, mainCategoriesSet, categoriesSet, subCategoriesSet } = products.reduce(
                (acc, product) => {
                    acc.brandsSet.add(product.brand);
                    acc.mainCategoriesSet.add(product.mainCategory);
                    acc.categoriesSet.add(product.category);
                    const subCategoryKey = `${product.subCategory}_${product.category}`;
                    if (!acc.subCategoriesSet[subCategoryKey]) {
                        acc.subCategoriesSet[subCategoryKey] = {
                            name: product.subCategory,
                            category: product.category
                        };
                    }
                    return acc;
                },
                { brandsSet: new Set(), mainCategoriesSet: new Set(), categoriesSet: new Set(), subCategoriesSet: {} }
            );
            const brands = [...brandsSet];
            const mainCategories = [...mainCategoriesSet];
            const categories = [...categoriesSet];
            const subcategories = Object.values(subCategoriesSet);
            console.log("before fetch or create....")
            // Fetch or create all relational data in parallel
            const [brandMap, mainCategoryMap, categoryMap] = await Promise.all([
                fetchOrCreate('brand', brands),
                fetchOrCreate('gender', mainCategories),
                fetchOrCreate('category', categories),
            ]);
            console.log("aftr fetch or create....")


            // Fetch or create subcategories after fetching categories
            const subcategoryMap = await fetchOrCreateSubcategories(subcategories, categoryMap);
            console.log("after sub cat...")


            const existingProducts = await strapi.db.query('api::product.product').findMany({
                where: {
                    pid: { $in: products.map(product => product.pid) }  // Find existing products by PID
                }
            });

            console.log("finded existing products...")

            const existingProductMap = existingProducts.reduce((map, product) => {
                map[product.pid] = product;
                return map;
            }, {});

            // Separate products into ones to update and create
            const updates = [];
            const creations = [];

            console.log("before products map...")

            products.forEach(product => {
                const productData = {
                    ...product,
                    brand: brandMap[product.brand],
                    category: categoryMap[product.category],
                    subCategory: subcategoryMap[`${product.subCategory}_${product.category}`],
                    mainCategory: mainCategoryMap[product.mainCategory]
                };

                if (existingProductMap[product.pid]) {
                    console.log("existingProductMap[product.pid]", existingProductMap[product.pid])
                    updates.push({
                        ...productData,
                        documentId: existingProductMap[product.pid].documentId
                    });
                } else {
                    creations.push({
                        ...productData,
                        publishedAt: new Date(), // Only for newly created products
                    });
                }
            });

            console.log("updates")

            // Update existing products sequentially
            for (const product of updates) {
                console.log("=============product", product)
                try {
                    // await strapi.db.query('api::product.product').update({
                    //     where: { pid: product.pid },
                    //     data: product
                    // });
                    await strapi.documents('api::product.product').update({
                        documentId: product.documentId,
                        data: product,
                        status: 'published'
                      });
                } catch (error) {
                    console.error(`Error updating product with PID: ${product.pid}`, error);
                }
            }


            // create new products
            for (const product of creations) {
                try {
                    await strapi.db.query('api::product.product').create({
                        data: product
                    });
                } catch (error) {
                    console.error('Error creating products:', error);
                }
            }

            return { updated: updates.length, created: creations.length };
        } catch (e) {
            console.error(e)
        }
    }
});
