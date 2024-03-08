const mongoose = require('mongoose');

const productCategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    parentCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProductCategory',
      default: null,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    products: {
      type: Array,
      of: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
  },
  { timestamps: { createdAt: true } }
);

module.exports = mongoose.model('ProductCategory', productCategorySchema);
