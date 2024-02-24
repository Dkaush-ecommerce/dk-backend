const User = require('../../db/models/User');

const getUserById = async (id) => User.findById(id);

const getUserByEmail = async (email) => User.findOne({ email });

module.exports = { getUserById, getUserByEmail };
