export const enrichWithWishlist = async(products, userId, brandId, isV5=false) => {
      if (!userId) {
        return products.map(product => (isV5 ? {
          ...product,
          isWishlisted:false,
        } :{
          attributes: product,
          isWishlisted: false
        }));
      }
  
      // Fetch the user's wishlist
      const wishlists = await strapi.db.query('api::wishlist.wishlist').findMany({
        where: {
            users: { userId },
            brand: { brandId },
          },
        populate: { products: true },
      });
  
      // Extract product IDs from the wishlist
      const wishlistedProductIds = wishlists.flatMap(wishlist =>
        wishlist.products.map(product => product.pid)
      );
  
      // Add the `isWishlisted` field to each product
      products = products.map(product => (isV5 ? {
        ...product,
        isWishlisted: wishlistedProductIds.includes(product.pid),
      } :
        {
        attributes: product,
        isWishlisted: wishlistedProductIds.includes(product.attributes?.pid || product.pid),
      }));
      return products;
  };
