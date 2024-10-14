require('dotenv').config();
const fs = require('fs');
const parse = require('csv-parser');
const axios = require('axios');

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}/api`;

// Axios request configuration with API token
const requestConfig = {
  headers: {
    Authorization: `Bearer ${process.env.API_TOKEN}`,
  }
};

async function createProductsBatch(productsBatch) {
  try {
    await axios.post(`${BASE_URL}/bulk-upsert`, {
      data: productsBatch
    }, requestConfig);  // Include token in the request
    console.log(`Batch created successfully with ${productsBatch.length} products`);
  } catch (error) {
    console.error(`Error creating products batch: ${error}`);
  }
}

async function processRows(rows) {
  function splitInput(input, delimiter = ',') {
    return input ? input.split(delimiter).map(item => item.trim()) : [];
  }

  const productsBatch = [];
  for (const row of rows) {
    const images = splitInput(row.ImagePath);
    const productData = {
      ooId: row.oo_id,
      title: row.Title,
      pid: row.PID,
      price: row.Price,
      color: splitInput(row.Color),
      size: splitInput(row.Size),
      material: splitInput(row.Materials),
      images,
      defaultImage: images[0],
      brand: row.Brand, 
      category: row.Category,
      subCategory: row.SubCategory,
      mainCategory: row.MainCategory,
      description: row.Description,
      rating: row.Rating
    };

    productsBatch.push(productData);

    // If the batch size is reached, send the batch and reset the array
    if (productsBatch.length === parseInt(process.env.BATCH_SIZE)) {
      await createProductsBatch(productsBatch);
      productsBatch.length = 0;  // Clear the array
    }
  }

  // Send remaining products if there are any left after the loop
  if (productsBatch.length > 0) {
    await createProductsBatch(productsBatch);
  }
}

// Read CSV and process each row
const rows = [];

async function readCSV(filePath) {
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(parse())
      .on('data', (row) => {
        rows.push(row);
      })
      .on('end', () => {
        console.log('CSV file successfully processed');
        resolve();
      })
      .on('error', (err) => {
        console.error('Error reading CSV file:', err);
        reject(err);
      });
  });
}

async function run() {
  try {
    await readCSV('./test2.csv');
    await processRows(rows);
    console.log('All rows have been processed successfully.');
  } catch (error) {
    console.error('Error during execution:', error.message);
  }
}

run();
