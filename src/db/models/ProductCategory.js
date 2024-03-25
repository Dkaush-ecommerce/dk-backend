const mongoose = require('mongoose');

const productCategorySchema = mongoose.Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: false },
);

module.exports = mongoose.model('ProductCategory', productCategorySchema);
