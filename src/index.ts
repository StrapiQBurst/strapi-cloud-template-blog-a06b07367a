export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   * 
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) { },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
      * run jobs, or perform some special logic.
   */
  async bootstrap(/*{ strapi }*/) {
    const knex = strapi.db.connection; // Get the database connection

    // Check if the 'unique_pid' constraint already exists
    const productConstraintExists = await knex('information_schema.TABLE_CONSTRAINTS')
      .where({
        TABLE_NAME: 'products',
        CONSTRAINT_TYPE: 'UNIQUE',
        CONSTRAINT_NAME: 'unique_pid',
      })
      .select('CONSTRAINT_NAME')
      .first();

    if (!productConstraintExists) {
      console.log('Adding unique constraint to pid in products table');

      // Add unique constraint to `pid` column
      await knex.raw(`
        ALTER TABLE products
        ADD CONSTRAINT unique_pid UNIQUE (pid);
      `);
      console.log('Unique constraint added to pid in products table');
    } else {
      console.log('Unique constraint "unique_pid" already exists on products table');
    }

    // Check if the 'unique_brand_product' constraint already exists
    const brandProductConstraintExists = await knex('information_schema.TABLE_CONSTRAINTS')
      .where({
        TABLE_NAME: 'products_brand_links',
        CONSTRAINT_TYPE: 'UNIQUE',
        CONSTRAINT_NAME: 'unique_brand_product',
      })
      .select('CONSTRAINT_NAME')
      .first();

    if (!brandProductConstraintExists) {
      console.log('Adding unique constraint to brand-product relation');
      await knex.raw(`
        ALTER TABLE products_brand_links
        ADD CONSTRAINT unique_brand_product UNIQUE (product_id);
      `);
      console.log('Unique constraint added to brand-product relation');
    } else {
      console.log('Unique constraint "unique_brand_product" already exists on products_brand_links');
    }

    // Check if the 'unique_gender_product' constraint already exists
    const genderProductConstraintExists = await knex('information_schema.TABLE_CONSTRAINTS')
      .where({
        TABLE_NAME: 'products_gender_links',
        CONSTRAINT_TYPE: 'UNIQUE',
        CONSTRAINT_NAME: 'unique_gender_product',
      })
      .select('CONSTRAINT_NAME')
      .first();

    if (!genderProductConstraintExists) {
      console.log('Adding unique constraint to gender-product relation');
      await knex.raw(`
          ALTER TABLE products_gender_links
          ADD CONSTRAINT unique_gender_product UNIQUE (product_id);
        `);
      console.log('Unique constraint added to gender-product relation');
    } else {
      console.log('Unique constraint "unique_gender_product" already exists on products_gender_links');
    }

    // Check if the 'unique_category_product' constraint already exists
    const categoryProductConstraintExists = await knex('information_schema.TABLE_CONSTRAINTS')
      .where({
        TABLE_NAME: 'products_category_links',
        CONSTRAINT_TYPE: 'UNIQUE',
        CONSTRAINT_NAME: 'unique_category_product',
      })
      .select('CONSTRAINT_NAME')
      .first();

    if (!categoryProductConstraintExists) {
      console.log('Adding unique constraint to category-product relation');
      await knex.raw(`
        ALTER TABLE products_category_links
        ADD CONSTRAINT unique_category_product UNIQUE (product_id);
      `);
      console.log('Unique constraint added to category-product relation');
    } else {
      console.log('Unique constraint "unique_category_product" already exists on products_category_links');
    }

    // Check if the 'unique_subcategory_product' constraint already exists
    const subcategoryProductConstraintExists = await knex('information_schema.TABLE_CONSTRAINTS')
      .where({
        TABLE_NAME: 'products_sub_category_links',
        CONSTRAINT_TYPE: 'UNIQUE',
        CONSTRAINT_NAME: 'unique_subcategory_product',
      })
      .select('CONSTRAINT_NAME')
      .first();

    if (!subcategoryProductConstraintExists) {
      console.log('Adding unique constraint to subcategory-product relation');
      await knex.raw(`
        ALTER TABLE products_sub_category_links
        ADD CONSTRAINT unique_subcategory_product UNIQUE (product_id);
      `);
      console.log('Unique constraint added to subcategory-product relation');
    } else {
      console.log('Unique constraint "unique_subcategory_product" already exists on products_sub_category_links');
    }
  },
};
