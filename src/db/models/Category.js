const mongoose = require('mongoose');

const categorySchema = mongoose.Schema(
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
  },
  { timestamps: { createdAt: true } }
);

module.exports = mongoose.model('Category', categorySchema);
