const { StatusCodes } = require('http-status-codes');
const catchAsync = require('../utils/catchAsync');
const userService = require('../services/userService.js');

const getUserById = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.user.id);
  res.status(StatusCodes.OK).json({ user });
});

const getWishlist = catchAsync(async (req, res) => {
  const products = await userService.getWishlist(req.user.id);
  res.status(StatusCodes.OK).json({ products });
});

module.exports = { getUserById, getWishlist };
