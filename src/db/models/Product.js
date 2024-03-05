const mongoose = require('mongoose');
const reviewSchema = require('../schemas/Review');

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
    reviews: [reviewSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
