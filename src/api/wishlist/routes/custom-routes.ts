export default {
  routes: [
    {
      method: 'POST',
      path: '/wishlist/upsert',
      handler: 'wishlist.upsert',
      config: {
        policies: [],
      },
    },
    {
      method: 'DELETE',
      path: '/wishlist/remove',
      handler: 'wishlist.remove',
      config: {
        policies: [],
      },
    },
  ]};