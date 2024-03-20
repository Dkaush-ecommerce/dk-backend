const { StatusCodes } = require('http-status-codes');
const Product = require('../db/models/Product');
const ProductCategory = require('../db/models/ProductCategory');
const generateSku = require('../utils/generateSku');
const ApiError = require('../errors/ApiError');
const parseCSV = require('../utils/parseCsv');

const getAllProducts = async (page, pageSize) => {
  const skip = (page - 1) * pageSize;
  const products = await Product.find().skip(skip).limit(pageSize);
  return products;
};

const addProduct = async (product) => {
  const newProduct = new Product(product);

  let sku;
  while (true) {
    sku = generateSku();
    // check if product with same sku exists
    const existingProduct = await Product.findOne({ sku });
    if (!existingProduct) {
      break;
    }
  }
  newProduct.sku = sku;
  // process images

  await newProduct.save();
  return newProduct;
};

const updateProduct = async () => {};

const deleteProduct = async (id) => {
  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Product not found!');
  }
};

const getProductById = async (id) => {
  const product = await Product.findById(id);
  if (!product) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Product not found!');
  }
  return product;
};

const getProductBySku = async (sku) => {
  const product = await Product.find({ sku });
  if (!product) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Product not found!');
  }
  return product;
};

const getCategoriesByProduct = async (productId) => {
  const categories = await ProductCategory.aggregate([
    { $match: { productId: mongoose.Types.ObjectId(productId) } },
    {
      $lookup: {
        from: 'categories',
        localField: 'categoryId',
        foreignField: '_id',
        as: 'category',
      },
    },
    { $unwind: '$category' },
    { $match: { 'category.active': true } },
  ]);
  console.log(categories);
  return categories;
};

const getTopProducts = async () => {};

const bulkAddProducts = async (fileObj) => {
  const products = await parseCSV(fileObj.originalname);
  try {
    await Product.insertMany(products);
  } catch (e) {
    throw new ApiError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'Please check the file and try again!'
    );
  }
  return products.length;
};

module.exports = {
  addProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getProductBySku,
  getTopProducts,
  getAllProducts,
  getCategoriesByProduct,
  bulkAddProducts,
};