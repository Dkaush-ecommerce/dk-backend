const mongoose = require('mongoose');
const User = require('../models/User');

const reviewSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
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
  createdOn: {
    type: Date,
    default: new Date(),
  },
});

module.exports = reviewSchema;
