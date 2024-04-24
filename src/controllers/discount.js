const { StatusCodes } = require('http-status-codes');
const catchAsync = require('../utils/catchAsync');
const discountService = require('../services/discountService');

const getAllDiscounts = catchAsync(async (req, res) => {
  const discounts = await discountService.getAllDiscounts();
  res.status(StatusCodes.OK).json({ discounts });
});

const getDiscountById = catchAsync(async (req, res) => {
  const { discountId } = req.params;
  const discount = await discountService.getDiscountById(discountId);
  res.status(StatusCodes.OK).json({ discount });
});

const addDiscount = catchAsync(async (req, res) => {});

const updateDiscount = catchAsync(async (req, res) => {});

const deleteDiscount = catchAsync(async (req, res) => {
  const { discountId } = req.params;
  await discountService.deleteDiscount(discountId);
  res.status(StatusCodes.NO_CONTENT).send();
});

module.exports = {
  getAllDiscounts,
  addDiscount,
  deleteDiscount,
  updateDiscount,
  getDiscountById,
};
