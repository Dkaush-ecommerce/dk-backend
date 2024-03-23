const User = require('../db/models/User');
const logger = require('../logger');

const getUserById = async (id) => User.findById(id);

const getUserByEmail = async (email) => User.findOne({ email });

const getUserByRefreshToken = async (refreshToken) =>
  User.findOne({ refreshToken });

const getUserCartProducts = async (userId) => {
  const cart = await User.findById(userId).populate('cart.items.product');
  return cart;
};

const getWishlist = async (userId) => {
  try {
    const user = await User.findById(userId);
    const wishlist = user.wishlist;
    const productIds = wishlist.map((item) => item.productId);
    const products = await Product.find({ _id: { $in: productIds } });
    return products;
  } catch (error) {
    logger.error(error.message);
    throw new ApiError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'Error fetching wishlist!'
    );
  }
};

module.exports = {
  getUserById,
  getUserByEmail,
  getUserByRefreshToken,
  getUserCartProducts,
  getWishlist,
};
