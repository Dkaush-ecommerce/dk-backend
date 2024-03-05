const User = require('../../db/models/User');

const getUserById = async (id) => User.findById(id);

const getUserByEmail = async (email) => User.findOne({ email });

const getUserByRefreshToken = async (refreshToken) =>
  User.findOne({ refreshToken });

module.exports = { getUserById, getUserByEmail, getUserByRefreshToken };
