const { StatusCodes } = require('http-status-codes');
const Product = require('../db/models/Product');
const ProductCategory = require('../db/models/ProductCategory');
const generateSku = require('../utils/generateSku');
const ApiError = require('../errors/ApiError');
const parseCSV = require('../utils/parseCsv');

const MIN_PRICE = 0;

const getAllProducts = async (
  page,
  pageSize,
  q,
  categoryIds,
  maxPrice,
  minPrice
) => {
  let query = {};

  if (q) {
    const searchRegex = new RegExp(`^${q}| ${q}`, 'i');
    query.$or = [{ name: searchRegex }, { sku: searchRegex }];
  }

  if (maxPrice !== undefined && minPrice !== undefined) {
    query.markedPrice = { $gte: minPrice, $lte: maxPrice };
  } else if (maxPrice !== undefined) {
    query.markedPrice = { $gte: MIN_PRICE, $lte: maxPrice };
  } else if (minPrice !== undefined) {
    query.markedPrice = { $gte: minPrice };
  }

  const skip = (page - 1) * pageSize;
  const limit = pageSize;

  let products = await Product.find(query).skip(skip).limit(limit).exec();

  if (categoryIds && categoryIds.length > 0) {
    products = await ProductCategory.find({
      categoryId: { $in: categoryIds },
    }).populate('productId');
  }

  return products;
};

const addProduct = async (product) => {
  const newProduct = new Product({ ...product, price: product.markedPrice });

  let sku;
  while (true) {
    sku = generateSku();
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

const updateProduct = async (productId, product) => {
  const product = await Product.findByIdAndUpdate({ _id: productId }, product, {
    new: true,
  });
};

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
