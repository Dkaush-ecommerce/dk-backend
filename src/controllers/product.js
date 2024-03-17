const { StatusCodes } = require('http-status-codes');
const catchAsync = require('../utils/catchAsync');
const productService = require('../services/product/productService');

const getAllProducts = catchAsync(async (req, res) => {
  const { page, pageSize } = req.query;
  const products = await productService.getAllProducts(page, pageSize);
  res.status(StatusCodes.OK).json({ products });
});

const addProduct = catchAsync(async (req, res) => {
  const product = await productService.addProduct(req.body);
  res.status(StatusCodes.CREATED).json({ product });
});

const updateProduct = catchAsync(async (req, res) => {});

const deleteProduct = catchAsync(async (req, res) => {
  await productService.deleteProduct(req.params.id);
  res.status(StatusCodes.NO_CONTENT).send();
});

const getProductById = catchAsync(async (req, res) => {
  const product = await productService.getProductById(req.params.id);
  res.status(StatusCodes.OK).json({ product });
});

const getProductBySku = catchAsync(async (req, res) => {
  const product = await productService.getProductBySku(req.params.sku);
  res.status(StatusCodes.OK).json({ product });
});

const getCategoriesByProduct = catchAsync(async (req, res) => {
  const categories = await productService.getCategoriesByProduct(req.params.id);
  res.status(StatusCodes.OK).json({ categories });
});

const getTopProducts = catchAsync(async (req, res) => {});

const bulkAddProducts = catchAsync(async (req, res) => {
  if (!req.file) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Please upload a file');
  }
  const totalProducts = await productService.bulkAddProducts(req.file);
  console.log(totalProducts);
  res
    .status(StatusCodes.CREATED)
    .json({ message: `Successfully added ${totalProducts} products!` });
});

module.exports = {
  addProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getAllProducts,
  getProductBySku,
  getTopProducts,
  getCategoriesByProduct,
  bulkAddProducts,
};
