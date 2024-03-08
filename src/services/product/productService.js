const { StatusCodes } = require('http-status-codes');
const Product = require('../../db/models/Product');
const generateSku = require('./generateSku');
const ApiError = require('../../errors/ApiError');
const ProductCategory = require('../../db/models/ProductCategory');

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

const getProductsByCategory = async (categoryId, page, pageSize) => {
  const skip = (page - 1) * pageSize;
  // Aggregation pipeline to paginate products array
  const aggregate = await ProductCategory.aggregate([
    // Match product category by some condition if needed
    { $match: { _id: categoryId } },
    // Unwind the products array to de-normalize
    { $unwind: '$products' },
    // Skip and limit to implement pagination
    { $skip: skip },
    { $limit: pageSize },
    // Populate the product field
    {
      $lookup: {
        from: 'Product', // Assuming 'products' is the collection name
        localField: 'products', // Field in productCategory
        foreignField: '_id', // Field in products collection
        as: 'products', // Field to populate products
      },
    },
    // Group back to the original format
    {
      $group: {
        _id: '$_id',
        products: { $push: '$products' },
      },
    },
  ]);
  console.log(aggregate);
  // return category.products;
};

const getProductBySku = async (sku) => {
  const product = await Product.find({ sku });
  if (!product) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Product not found!');
  }
  return product;
};

const getTopProducts = async () => {};

module.exports = {
  addProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getProductsByCategory,
  getProductBySku,
  getTopProducts,
  getAllProducts,
};
