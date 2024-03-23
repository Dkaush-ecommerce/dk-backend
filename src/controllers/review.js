const { StatusCodes } = require('http-status-codes');
const catchAsync = require('../utils/catchAsync');
const reviewService = require('../services/reviewService');

const getAllReviews = catchAsync(async (req, res) => {
  const reviews = await reviewService.getAllReviews();
  res.status(StatusCodes.OK).json({ reviews });
});

const createReview = catchAsync(async (req, res) => {
  const review = await reviewService.createReview(req.body);
  res.status(StatusCodes.CREATED).json({ review });
});

const removeReview = catchAsync(async (req, res) => {
  const { id: reviewId } = req.params;
  await reviewService.removeReview(reviewId);
  res.status(StatusCodes.NO_CONTENT).send();
});

const getReviewsByProduct = catchAsync(async (req, res) => {
  const { id: productId } = req.params;
  const reviews = await reviewService.getReviewsByProduct(productId);
  res.status(StatusCodes.OK).json({ reviews });
});

module.exports = {
  getAllReviews,
  createReview,
  removeReview,
  getReviewsByProduct,
};
