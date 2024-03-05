const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      time: true,
    },
    sku: {
      type: String,
      required: true,
    },
    inStock: {
      type: Boolean,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      default: '',
    },
    marked_price: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
