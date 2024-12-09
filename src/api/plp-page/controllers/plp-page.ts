/**
 * plp-page controller
 */

import { factories } from '@strapi/strapi'
export default factories.createCoreController('api::plp-page.plp-page', ({ strapi }) => ({
  async find(ctx) {
    const { mainCategory, brand, theme, locale } = ctx.query;
    const categoryFilters = { mainCategory, brand: { brandId: brand}, locale }
    const filteredcategoryFilters = Object.fromEntries(
      Object.entries(categoryFilters).filter(([, value]) => value)
    );

    // Fetch PLP page details with the necessary fields
    const plpPages = await strapi.db.query('api::plp-page.plp-page').findMany({
      where: {
        brand: {
          brandId: brand
        },
        theme,
        locale
      },
      populate: {
        bestSeller: {
          populate: {
            products: true,
          },
        },
        sortingOptions: true,
      },
    });
    console.log("plpPages", plpPages)
    if (!plpPages.length) {
      return ctx.notFound('No PLP page found');
    }
    let categoryData;
    let priceFilter;
    if (plpPages[0].showPriceFilter && mainCategory) {
      const minPriceData = await strapi.db.query('api::product.product').findMany({
        select: ['price'],
        where: { mainCategory: { id: mainCategory } },
        orderBy: { price: 'asc' },
        limit: 1,
      });

      // Get the maximum price
      const maxPriceData = await strapi.db.query('api::product.product').findMany({
        select: ['price'],
        where: { mainCategory: { id: mainCategory } },
        orderBy: { price: 'desc' },
        limit: 1,
      });

      // Include the price details in the response
      if (minPriceData.length && maxPriceData.length) {
        priceFilter = {
          minPrice: minPriceData[0].price,
          maxPrice: maxPriceData[0].price,
        };
      }
    }

    if (plpPages[0].showCategories) {
      const categories = await strapi.db.query('api::category.category').findMany({
        where: {
          locale: locale || 'en',
        },
        populate: {
          subcategories: true,
          where: {
            locale: locale || 'en',
          },
        },
      });

      categoryData = await Promise.all(categories.map(async (category) => {
        // Count products for this category filtered by mainCategory and brand
        const categoryProductCount = await strapi.db.query('api::product.product').count({
          where: {
            category: category.id,
            ...filteredcategoryFilters
          },
        });

        // Process subcategories and their product counts
        const subcategoryData = await Promise.all(category.subcategories.map(async (subcategory) => {
          // Count products for this subcategory filtered by mainCategory and brand
          const subcategoryProductCount = await strapi.db.query('api::product.product').count({
            where: {
              subCategory: subcategory.id,
              ...filteredcategoryFilters
            },
          });


          return {
            id: subcategory.id,
            name: subcategory.name,
            productCount: subcategoryProductCount, // Product count for this subcategory
          };
        }));

        return {
          id: category.id,
          name: category.name,
          productCount: categoryProductCount, // Product count for this category
          subcategories: subcategoryData, // Subcategories with their product counts
        };
      }));

    }

    // Return the PLP page details along with category and subcategory product counts
    return this.transformResponse({
      ...plpPages[0],
      categories: categoryData,
      priceFilter
    });
  },
}));