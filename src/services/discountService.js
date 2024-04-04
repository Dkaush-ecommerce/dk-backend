const { StatusCodes } = require('http-status-codes');
const ApiError = require('../errors/ApiError');
const Discount = require('../db/models/discount');

const getAllDiscounts = async () => {
  const discounts = await Discount.find({});
  return discounts;
};

const getDiscountById = async (id) => {
  const discount = await Discount.findById(id);
  if (!discount) {
    throw ApiError(StatusCodes.NOT_FOUND, `No discount with id : ${id}`);
  }
  return discount;
};

const addDiscount = async () => {};

const updateDiscount = async () => {};

const deleteDiscount = async () => {};

module.exports = {
  getAllDiscounts,
  getDiscountById,
  addDiscount,
  updateDiscount,
  deleteDiscount,
};
