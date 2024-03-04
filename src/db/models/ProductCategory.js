const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
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
    products: {
      type: Array,
      of: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
  },
  { timestamps: { createdAt: true } }
);

module.exports = mongoose.model('User', userSchema);
