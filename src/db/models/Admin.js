const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = mongoose.Schema(
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
  },
  { timestamps: true },
);

adminSchema.statics.isEmailTaken = async function (email, excludeAdminId) {
  const admin = await this.findOne({ email, _id: { $ne: excludeAdminId } });
  return !!admin;
};

adminSchema.methods.isPasswordMatch = async function (password) {
  const admin = this;
  return bcrypt.compare(password, admin.password);
};

module.exports = mongoose.model('Admin', adminSchema);
