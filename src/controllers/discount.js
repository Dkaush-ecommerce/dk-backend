const { StatusCodes } = require('http-status-codes');
const catchAsync = require('../utils/catchAsync');
const discountService = require('../services/discountService');

const getAllDiscounts = catchAsync(async (req, res) => {
  const discounts = await discountService.getAllDiscounts();
  res.status(StatusCodes.OK).json({ discounts });
});

const getDiscountById = catchAsync(async (req, res) => {});

const addDiscount = catchAsync(async (req, res) => {});

const updateDiscount = catchAsync(async (req, res) => {});

const deleteDiscount = catchAsync(async (req, res) => {});

module.exports = {
  getAllDiscounts,
  addDiscount,
  deleteDiscount,
  updateDiscount,
  getDiscountById,
};
