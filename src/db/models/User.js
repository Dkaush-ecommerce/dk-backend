const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cartSchema = require('../schemas/Cart');

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      default: '',
    },
    cart: { type: cartSchema, default: {} },
    wishlist: {
      type: Array,
      of: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      default: [],
    },
  },
  { timestamps: true },
);

userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

module.exports = mongoose.model('User', userSchema);
