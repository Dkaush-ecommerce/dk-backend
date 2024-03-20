const { StatusCodes } = require('http-status-codes');
const Category = require('../db/models/Category');
const ProductCategory = require('../db/models/ProductCategory');
const ApiError = require('../errors/ApiError');

const getAllCategories = async () => {
  const categories = await Category.find();
  if (!categories) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'No categories found!');
  }
  return categories;
};

const getCategoryById = async (id) => {
  const category = await Category.findById(id);
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
  const category = await Category.findByIdAndDelete(categoryId);
  if (!category) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Category not found!');
  }
};

const getProductsByCategory = async (categoryId, page, pageSize) => {
  const skip = (page - 1) * pageSize;
  const products = await ProductCategory.aggregate([
    { $match: { categoryId: mongoose.Types.ObjectId(categoryId) } },
    {
      $lookup: {
        from: 'products',
        localField: 'productId',
        foreignField: '_id',
        as: 'product',
      },
    },
    { $unwind: '$product' },
    { $match: { 'product.isActive': true } },
    { $skip: skip },
    { $limit: pageSize },
  ]);
  return products;
};

module.exports = {
  getAllCategories,
  addCategory,
  deleteCategory,
  getCategoryById,
  getProductsByCategory,
};
