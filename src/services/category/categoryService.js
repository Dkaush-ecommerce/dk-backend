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

module.exports = {
  getAllCategories,
  addCategory,
  deleteCategory,
  getCategoryById,
  getProductsByCategory,
};
