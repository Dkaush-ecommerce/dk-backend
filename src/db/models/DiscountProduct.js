const mongoose = require('mongoose');

const discountProductSchema = mongoose.Schema(
  {
    discountId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Discount',
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Product',
    },
  },
  { timestamps: false },
);

module.exports = mongoose.model('DiscountProduct', discountProductSchema);
