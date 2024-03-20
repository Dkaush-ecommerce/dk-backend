const { StatusCodes } = require('http-status-codes');
const catchAsync = require('../utils/catchAsync');
const categoryService = require('../services/categoryService');

const getAllCategories = catchAsync(async (req, res) => {
  const categories = await categoryService.getAllCategories();
  res.status(StatusCodes.OK).json({ categories });
});

const getCategoryById = catchAsync(async (req, res) => {
  const category = await categoryService.getCategoryById(req.params.id);
  res.status(StatusCodes.OK).json({ category });
});

const addCategory = catchAsync(async (req, res) => {
  const category = await categoryService.addCategory(req.body);
  res.status(StatusCodes.CREATED).json({ category });
});

const deleteCategory = catchAsync(async (req, res) => {
  await categoryService.deleteCategory(req.params.id);
  res.status(StatusCodes.NO_CONTENT).send();
});

const getProductsByCategory = catchAsync(async (req, res) => {
  const { limit, page } = req.query;
  const products = await categoryService.getProductsByCategory(
    req.body.category,
    page,
    limit
  );
  res.status(StatusCodes.OK).json({ products });
});

module.exports = {
  getAllCategories,
  addCategory,
  deleteCategory,
  getCategoryById,
  getProductsByCategory,
};
