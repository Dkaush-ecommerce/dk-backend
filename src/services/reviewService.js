const { StatusCodes } = require('http-status-codes');
const ApiError = require('../errors/ApiError');
const Review = require('../db/models/Review');

const getAllReviews = async (page, limit) => {
  try {
    const skip = (page - 1) * limit;
    const reviews = await Review.find().skip(skip).limit(limit);
    return reviews;
  } catch (error) {
    throw ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

const createReview = async (review) => {
  try {
    const newReview = new Review(review);
    //process images
    await newReview.save();
    return newReview;
  } catch (error) {
    throw ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

const removeReview = async (reviewId) => {
  try {
    const review = await Review.findByIdAndDelete(reviewId);
    if (!review) {
      throw ApiError(StatusCodes.NOT_FOUND, 'Review not found!');
    }
  } catch (error) {
    throw ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

const getReviewsByProduct = async (productId) => {
  try {
    const reviews = await Review.find({ product: productId });
    return reviews;
  } catch (error) {
    throw ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

module.exports = {
  getAllReviews,
  createReview,
  removeReview,
  getReviewsByProduct,
};
