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
    isActive: {
      type: Boolean,
      default: true,
    },
    inStock: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    markedPrice: {
      type: Number,
      required: true,
    },
    length: {
      type: Number,
    },
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
    reviewsAllowed: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
