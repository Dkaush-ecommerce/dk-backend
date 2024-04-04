const mongoose = require('mongoose');

const discountSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    discount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: { createdAt: true } },
);

module.exports = mongoose.model('Discount', discountSchema);
