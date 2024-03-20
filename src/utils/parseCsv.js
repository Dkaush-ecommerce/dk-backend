const fs = require('fs');
const csv = require('@fast-csv/parse');
const generateSku = require('./generateSku');

const parseCSV = (filename) => {
  return new Promise((resolve, reject) => {
    const products = [];
    const encounteredSKUs = new Set(); // To track encountered SKUs

    csv
      .parseFile(`uploads/${filename}`)
      .on('error', (error) => reject(error))
      .on('data', (row) => {
        const sku = generateSku(row[1]);

        // Check if SKU has been encountered before
        if (!encounteredSKUs.has(sku) && row[1] !== '') {
          const product = {
            name: row[2],
            sku: sku,
            isActive: row[3] === '1',
            inStock: parseInt(row[7]),
            price: parseFloat(row[15]),
            description: row[5],
          };
          products.push(product);
          encounteredSKUs.add(sku); // Add SKU to encountered set
        }
      })
      .on('end', (rowCount) => {
        console.log(`Parsed ${rowCount} rows!`);
        products.shift();
        resolve(products);
      });
  });
};

module.exports = parseCSV;
