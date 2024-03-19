const { StatusCodes } = require('http-status-codes');
const productService = require('../product/productService');
const ApiError = require('../../errors/ApiError');
const { getUserById } = require('../user/userService');

const addToCart = async (productId, userId) => {
  const product = await productService.getProductById(productId);
  if (!product || !product.isActive) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Product not found!');
  }
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User not found!');
  }
  const cartProducts = user.cart.items.map((item) => item.product.toString());
  if (cartProducts.includes(productId)) {
    const index = cartProducts.indexOf(productId);
    user.cart.items[index].quantity += 1;
    user.cart.items[index].aggregatedPrice += product.price;
    await user.save();
  } else {
    user.cart.items.push({
      product: productId,
      quantity: 1,
      aggregatedPrice: product.price,
    });
    await user.save();
  }
  return user.cart;
};

const deleteFromCart = async (productId, userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User not found!');
  }
  const cartProducts = user.cart.items.map((item) => item.product.toString());
  if (!cartProducts.includes(productId)) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Product not found in cart!');
  }
  const index = cartProducts.indexOf(productId);
  user.cart.items.splice(index, 1);
  await user.save();
  return user.cart;
};

const getCart = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User not found!');
  }
  return user.cart;
};

const deleteCart = async (userId) => {
  await User.findByIdAndUpdate(userId, { cart: {} });
};

module.exports = { addToCart, deleteFromCart, getCart, deleteCart };
