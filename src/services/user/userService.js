const User = require('../../db/models/User');

const getUserById = async (id) => User.findById(id);

const getUserByEmail = async (email) => User.findOne({ email });

const getUserByRefreshToken = async (refreshToken) =>
  User.findOne({ refreshToken });

const getUserCartProducts = async (userId) => {
  const cart = await User.findById(userId).populate('cart.items.product');
  return cart;
};

module.exports = {
  getUserById,
  getUserByEmail,
  getUserByRefreshToken,
  getUserCartProducts,
};
