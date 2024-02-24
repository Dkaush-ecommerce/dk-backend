const bcrypt = require('bcryptjs');
const { StatusCodes } = require('http-status-codes');
const User = require('../../db/models/User');
const ApiError = require('../../errors/ApiError');
const { getUserByEmail } = require('../user/userService');

const signup = async (userObj) => {
  const hashedPassword = await bcrypt.hash(userObj.password, 12);
  const user = await User.create({
    email: userObj.email,
    password: hashedPassword,
    firstName: userObj.firstName,
    lastName: userObj.lastName,
  });
  return {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };
};

const loginWithEmailAndPassword = async (email, password) => {
  const user = await getUserByEmail(email);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Incorrect email or password');
  }
  return {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };
};

module.exports = { signup, loginWithEmailAndPassword };
