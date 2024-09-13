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

async function getBrandId(brand) {
    const url = `${BASE_URL}/brands`;
    const queryParams = {
      filters: {
        name: {
          $eq: brand
        }
      }
    };
    const response = await axios.get(url, { 
      params: queryParams, 
      ...requestConfig // Include token in the request
    });
  
    if (response.data.data.length > 0) {
      return response.data.data[0].id;
    } else {
      const newBrand = await axios.post(url, {
        data: {
          name: brand
        }
      }, requestConfig);  // Include token in the request
      return newBrand.data.data.id;
    }
  }

  async function getGenderId(gender) {
    const url = `${BASE_URL}/genders`;
    const queryParams = {
      filters: {
        name: {
          $eq: gender
        }
      }
    };
    const response = await axios.get(url, { 
      params: queryParams, 
      ...requestConfig // Include token in the request
    });
  
    if (response.data.data.length > 0) {
      return response.data.data[0].id;
    } else {
      const newGender = await axios.post(url, {
        data: {
          name: gender
        }
      }, requestConfig);  // Include token in the request
      return newGender.data.data.id;
    }
  }

async function getCategoryId(categoryName) {
  const url = `${BASE_URL}/categories`;
  const queryParams = {
    filters: {
      name: {
        $eq: categoryName
      }
    }
  };
  const response = await axios.get(url, { 
    params: queryParams, 
    ...requestConfig // Include token in the request
  });

  if (response.data.data.length > 0) {
    return response.data.data[0].id;
  } else {
    const newCategory = await axios.post(url, {
      data: {
        name: categoryName,
        link: "",
        description: ""
      }
    }, requestConfig);  // Include token in the request
    return newCategory.data.data.id;
  }
}

async function getSubcategoryId(subcategoryName, categoryId) {
  const response = await axios.get(`${BASE_URL}/subcategories`, {
    params: {
      filters: {
        name: {
          $eq: subcategoryName
        },
        category: {
          $eq: categoryId
        }
      }
    },
    ...requestConfig  // Include token in the request
  });

  if (response.data.data.length > 0) {
    return response.data.data[0].id;
  } else {
    const newSubcategory = await axios.post(url, {
      data: {
        name: subcategoryName,
        link: "",
        description: "",
        category: categoryId
      }
    }, requestConfig);  // Include token in the request
    return newSubcategory.data.data.id;
  }
}

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
  const productsBatch = [];
  for (const row of rows) {
    const genderId = await getGenderId(row.Gender)
    const categoryId = await getCategoryId(row.Category);
    const subcategoryId = await getSubcategoryId(row.SubCategory, categoryId);
    const brandId = await getBrandId(row.Brand)

    const productData = {
      ooId: row.oo_id,
      title: row.Title,
      pid: row.PID,
      price: row.Price,
      imagePath: row.ImagePath,
      brand: brandId, 
      category: categoryId,
      subCategory: subcategoryId,
      gender: genderId,
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
    await readCSV('./catalog.csv');
    await processRows(rows);
    console.log('All rows have been processed successfully.');
  } catch (error) {
    console.error('Error during execution:', error.message);
  }
}

run();
