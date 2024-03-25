const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    review: {
      type: String,
      required: true,
      trim: true,
    },
    images: {
      type: Array,
      of: String,
      default: [],
    },
    createdOn: {
      type: Date,
      default: new Date(),
    },
  },
  { timestamps: false },
);

module.exports = mongoose.model('Review', reviewSchema);
