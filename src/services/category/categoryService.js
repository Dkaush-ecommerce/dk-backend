const { StatusCodes } = require('http-status-codes');
const ProductCategory = require('../../db/models/ProductCategory');
const ApiError = require('../../errors/ApiError');

const getAllCategories = async () => {
  const categories = await ProductCategory.find();
  if (!categories) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'No categories found!');
  }
  return categories;
};

const getCategoryById = async (id) => {
  const category = await ProductCategory.findById(id);
  if (!category) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Category not found!');
  }
  return category;
};

const addCategory = async (category) => {
  const newCategory = new ProductCategory(category);
  await newCategory.save();

  // process images

  return newCategory;
};

const deleteCategory = async (categoryId) => {
  const category = await ProductCategory.findByIdAndDelete(categoryId);
  if (!category) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Category not found!');
  }
};

module.exports = {
  getAllCategories,
  addCategory,
  deleteCategory,
  getCategoryById,
};
