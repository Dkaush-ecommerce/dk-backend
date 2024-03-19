const mongoose = require('mongoose');
const cartItemSchema = require('./CartItem');

const cartSchema = mongoose.Schema({
  subTotalPrice: {
    type: Number,
    required: true,
  },
  shippingPrice: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  items: [cartItemSchema],
});

module.exports = cartSchema;
