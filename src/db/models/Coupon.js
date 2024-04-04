const mongoose = require('mongoose');

const couponSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
      trim: true,
    },
    expires: {
      type: Number,
      required: true,
    },
    products: {
      type: [mongoose.Types.ObjectId],
      default: [],
    },
    categories: {
      type: [mongoose.Types.ObjectId],
      default: [],
    },
  },
  { timestamps: { createdAt: true } },
);

module.exports = mongoose.model('Coupon', couponSchema);
