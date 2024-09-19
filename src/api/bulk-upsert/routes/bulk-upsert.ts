export default {
  routes: [
    {
     method: 'POST',
     path: '/bulk-upsert',
     handler: 'bulk-upsert.bulkUpsert',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};
