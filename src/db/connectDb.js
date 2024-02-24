const mongoose = require('mongoose');

const connectDB = async (url) => {
  return mongoose.connect(url, console.log('Connected to the DB'));
};

module.exports = connectDB;
