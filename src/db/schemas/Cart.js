const mongoose = require('mongoose');
const cartItemSchema = require('./CartItem');

const cartSchema = mongoose.Schema({
  subTotalPrice: {
    type: Number,
  },
  shippingPrice: {
    type: Number,
  },
  totalPrice: {
    type: Number,
  },
  items: [cartItemSchema],
});

module.exports = cartSchema;
