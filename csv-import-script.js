require('dotenv').config();
const fs = require('fs');
const parse = require('csv-parser');
const mysql = require('mysql');

// Create a MySQL connection
const conf = {
    host: '192.168.100.10', // Configured value in docker-compose.yml
    user: process.env.DATABASE_USERNAME,
    port: process.env.DATABASE_PORT,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
};
const connection = mysql.createConnection(conf);

// Promisified MySQL query function
const queryAsync = (sql, values = []) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, values, (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};

// Helper function to get or create a brand by name
async function getBrandId(brand) {
    const rows = await queryAsync(`SELECT id FROM brands WHERE name = ?`, [brand]);
    if (rows.length > 0) {
        return rows[0].id;
    } else {
        const result = await queryAsync(`INSERT INTO brands (name, published_at) VALUES (?, ?)`, [brand, new Date()]);
        return result.insertId;
    }
}

// Helper function to get or create a category by name
async function getCategoryId(categoryName) {
    const rows = await queryAsync(`SELECT id FROM categories WHERE name = ?`, [categoryName]);
    if (rows.length > 0) {
        return rows[0].id;
    } else {
        const result = await queryAsync(`INSERT INTO categories (name, published_at, link, description) VALUES (?, ?, '', '')`, [categoryName, new Date()]);
        return result.insertId;
    }
}

// Helper function to get or create a subcategory by name
async function getSubcategoryId(subcategoryName, categoryId) {
    const rows = await queryAsync(`SELECT id FROM subcategories WHERE name = ?`, [subcategoryName]);
    if (rows.length > 0) {
        await insertSubcategoryCategoryLink(rows[0].id, categoryId);
        return rows[0].id;
    } else {
        const result = await queryAsync(`INSERT INTO subcategories (name, published_at, link, description) VALUES (?, ?, '', '')`, [subcategoryName, new Date()]);
        await insertSubcategoryCategoryLink(result.insertId, categoryId);
        return result.insertId;
    }
}

// Function to insert a relation between subcategory and category
async function insertSubcategoryCategoryLink(subcategoryId, categoryId) {
    const linkRows = await queryAsync(`SELECT * FROM subcategories_category_links WHERE subcategory_id = ? AND category_id = ?`, [subcategoryId, categoryId]);
    if (linkRows.length === 0) {
        await queryAsync(`INSERT INTO subcategories_category_links (subcategory_id, category_id) VALUES (?, ?)`, [subcategoryId, categoryId]);
        console.log(`Inserted relation between subcategory ${subcategoryId} and category ${categoryId}`);
    }
}

// Upsert product
async function upsertProduct(productData) {
    const categoryId = await getCategoryId(productData.category);
    const subcategoryId = await getSubcategoryId(productData.subcategory, categoryId);
    const brandId = await getBrandId(productData.brand);
    // Upsert product
    const productResult = await queryAsync(
        `INSERT INTO products (oo_id, title, pid, price, image_path, published_at) 
        VALUES (?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE 
        title = VALUES(title), pid= VALUES(pid), price = VALUES(price), image_path = VALUES(image_path), published_at = VALUES(published_at)`,
        [
            productData.oo_id,
            productData.title,
            productData.pid,
            productData.price,
            productData.image,
            new Date()
        ]
    );

    const productId = productResult.insertId || (await queryAsync(`SELECT id FROM products WHERE oo_id = ?`, [productData.oo_id]))[0].id;

    console.log(`Product processed with ID: ${productId}`);

    // Upsert relations
    await Promise.all([
        queryAsync(
            `INSERT INTO products_brand_links (brand_id, product_id)
            VALUES (?, ?)
            ON DUPLICATE KEY UPDATE brand_id = VALUES(brand_id), product_id = VALUES(product_id)`,
            [brandId, productId]
        ),
        queryAsync(
            `INSERT INTO products_category_links (category_id, product_id)
            VALUES (?, ?)
            ON DUPLICATE KEY UPDATE category_id = VALUES(category_id), product_id = VALUES(product_id)`,
            [categoryId, productId]
        ),
        queryAsync(
            `INSERT INTO products_sub_category_links (subcategory_id, product_id)
            VALUES (?, ?)
            ON DUPLICATE KEY UPDATE subcategory_id = VALUES(subcategory_id), product_id = VALUES(product_id)`,
            [subcategoryId, productId]
        )
    ]);
}

// Read CSV and process each row
const rows = [];

function readCSV(filePath) {
    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(parse())
            .on('data', (row) => rows.push(row))
            .on('end', () => {
                console.log('CSV file successfully processed');
                resolve();
            })
            .on('error', (err) => reject(err));
    });
}

async function processRows() {
    for (const row of rows) {
        const productData = {
            oo_id: row.oo_id,
            title: row.Title,
            pid: row.PID,
            price: row.Price,
            image: row.ImagePath,
            brand: row.Brand,
            category: row.Category,
            subcategory: row.SubCategory
        };

        try {
            await upsertProduct(productData);
            console.log(`Product processed: ${productData.title}`);
        } catch (err) {
            console.error(`Error processing product ${productData.title}:`, err);
        }
    }
}

async function run() {
    try {
        await readCSV('./catalog.csv');
        await processRows();
        console.log('All rows have been processed successfully.');
    } catch (err) {
        console.error('Error during execution:', err.message);
    } finally {
        connection.end(); // Close the MySQL connection
    }
}

run();
