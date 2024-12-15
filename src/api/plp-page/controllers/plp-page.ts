/**
 * plp-page controller
 */

import { factories } from '@strapi/strapi'
export default factories.createCoreController('api::plp-page.plp-page', ({ strapi }) => ({
  async find(ctx) {
    const { categoryId, brand, theme, locale } = ctx.query;
    const categoryFilters = { brand: { brandId: brand }, locale };
    const filteredCategoryFilters = Object.fromEntries(
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
    if (!plpPages.length) {
      return ctx.notFound('No PLP page found');
    }
    let categoryData;
    let priceFilter;
    if (plpPages[0].showPriceFilter && categoryId) {
      const minPriceData = await strapi.db.query('api::product.product').findMany({
        select: ['price'],
        where: { category: { documentId: categoryId } },
        orderBy: { price: 'asc' },
        limit: 1,
      });

      const maxPriceData = await strapi.db.query('api::product.product').findMany({
        select: ['price'],
        where: { category: { documentId: categoryId } },
        orderBy: { price: 'desc' },
        limit: 1,
      });

      if (minPriceData.length && maxPriceData.length) {
        priceFilter = {
          minPrice: minPriceData[0].price,
          maxPrice: maxPriceData[0].price,
        };
      }
    }

    // Handle Categories and Subcategories
    if (categoryId) {
      const category = await strapi.db.query('api::category.category').findOne({
        where: { documentId: categoryId, locale: locale || 'en' },
        populate: {
          subcategories: {
            populate: {
              image: true,
            },
          },
        },
      });

      if (category) {
        const subcategoryData = await Promise.all(
          category.subcategories.map(async (subcategory) => {
            const subcategoryProductCount = await strapi.db.query('api::product.product').count({
              where: {
                subCategory: subcategory.id,
                ...filteredCategoryFilters,
              },
            });

            return {
              id: subcategory.id,
              name: subcategory.name,
              image: subcategory.image,
              productCount: subcategoryProductCount,
            };
          })
        );

        categoryData = {
          id: category.id,
          name: category.name,
          subcategories: subcategoryData,
        };
      }
    }

    // Return the PLP page details with the category and subcategories
    return this.transformResponse({
      ...plpPages[0],
      category: categoryData,
      priceFilter,
    });
  },
}));
