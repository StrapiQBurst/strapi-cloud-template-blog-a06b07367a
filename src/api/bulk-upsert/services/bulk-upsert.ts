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
                const existingSubcategories = await strapi.db.query('api::subcategory.subcategory').findMany({
                    where: {
                        $or: subcategories.map(subcategory => ({
                            name: subcategory.name,
                            category: categoryMap[subcategory.category]
                        }))
                    },
                    populate: ['category']
                });

                const existingMap = existingSubcategories.reduce((map, subcategory) => {
                    map[`${subcategory.name}_${subcategory.category[0].name}`] = subcategory.id;
                    return map;
                }, {});

                const newSubcategories = subcategories.filter(subcategory =>
                    !existingMap[`${subcategory.name}_${subcategory.category}`]
                );

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

            const { brandsSet, gendersSet, categoriesSet, subCategoriesSet } = products.reduce(
                (acc, product) => {
                    acc.brandsSet.add(product.brand);
                    acc.gendersSet.add(product.gender);
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
                { brandsSet: new Set(), gendersSet: new Set(), categoriesSet: new Set(), subCategoriesSet: {} }
            );
            const brands = [...brandsSet];
            const genders = [...gendersSet];
            const categories = [...categoriesSet];
            const subcategories = Object.values(subCategoriesSet);

            // Fetch or create all relational data in parallel
            const [brandMap, genderMap, categoryMap] = await Promise.all([
                fetchOrCreate('brand', brands),
                fetchOrCreate('gender', genders),
                fetchOrCreate('category', categories),
            ]);

            // Fetch or create subcategories after fetching categories
            const subcategoryMap = await fetchOrCreateSubcategories(subcategories, categoryMap);

            const existingProducts = await strapi.db.query('api::product.product').findMany({
                where: {
                    pid: { $in: products.map(product => product.pid) }  // Find existing products by PID
                }
            });

            const existingProductMap = existingProducts.reduce((map, product) => {
                map[product.pid] = product;
                return map;
            }, {});

            // Separate products into ones to update and create
            const updates = [];
            const creations = [];

            products.forEach(product => {
                const productData = {
                    ...product,
                    brand: brandMap[product.brand],
                    category: categoryMap[product.category],
                    subCategory: subcategoryMap[`${product.subCategory}_${product.category}`],
                    gender: genderMap[product.gender]
                };

                if (existingProductMap[product.pid]) {
                    updates.push(productData);
                } else {
                    creations.push({
                        ...productData,
                        publishedAt: new Date(), // Only for newly created products
                    });
                }
            });

            // Update existing products sequentially
            for (const product of updates) {
                try {
                    await strapi.db.query('api::product.product').update({
                        where: { pid: product.pid },
                        data: product
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
