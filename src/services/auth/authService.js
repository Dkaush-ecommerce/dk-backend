const { StatusCodes, getReasonPhrase } = require('http-status-codes');
const bcrypt = require('bcryptjs');
const tokenService = require('../token/tokenService');
const User = require('../../db/models/User');

const signup = async (userObj) => {
  let result = {};
  try {
    const hashedPassword = await bcrypt.hash(userObj.password, 12);
    const user = await User.create({
      email: userObj.email,
      password: hashedPassword,
      firstName: userObj.firstName,
      lastName: userObj.lastName,
    });
    const userDetails = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
    const tokens = await tokenService.generateAuthTokens(userDetails);
    let responseObj = {
      user: userDetails,
      tokens,
    };
    result = {
      status: StatusCodes.CREATED,
      message: 'successful',
      data: responseObj,
    };
    return result;
  } catch (err) {
    result = {
      status: StatusCodes.BAD_REQUEST,
      message: 'failed',
      error: err,
    };
    return result;
  }
};

module.exports = { signup };
