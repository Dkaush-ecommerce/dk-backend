const { StatusCodes } = require('http-status-codes');
const cartService = require('../services/cartService');
const catchAsync = require('../utils/catchAsync');

const addToCart = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const productId = req.params.id;
  const cart = await cartService.addToCart(productId, userId);
  res.status(StatusCodes.OK).send(cart);
});

const deleteFromCart = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const productId = req.params.id;
  const cart = await cartService.deleteFromCart(productId, userId);
  res.status(StatusCodes.OK).send(cart);
});

const getCart = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const cart = await cartService.getCart(userId);
  res.status(StatusCodes.OK).send(cart);
});

const deleteCart = catchAsync(async (req, res) => {
  const userId = req.user.id;
  await cartService.deleteCart(userId);
  res.sendStatus(StatusCodes.NO_CONTENT);
});

module.exports = { addToCart, getCart, deleteCart, deleteFromCart };
