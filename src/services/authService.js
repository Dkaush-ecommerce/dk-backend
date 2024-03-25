const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const { StatusCodes } = require('http-status-codes');
const User = require('../db/models/User');
const ApiError = require('../errors/ApiError');
const { getUserByEmail, getUserByRefreshToken } = require('./userService');
const envConfig = require('../config/env');
const tokenService = require('./tokenService');
const tokenTypes = require('../utils/constants/tokenTypes');

const signup = async (userObj) => {
  try {
    if (await User.isEmailTaken(userObj.email)) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Email already taken!');
    }
    const hashedPassword = await bcrypt.hash(userObj.password, 12);
    const user = await User.create({
      email: userObj.email,
      password: hashedPassword,
      firstName: userObj.firstName,
      lastName: userObj.lastName,
    });
    return user;
  } catch (error) {
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

const loginWithEmailAndPassword = async (email, password) => {
  const user = await getUserByEmail(email);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Incorrect email or password');
  }
  return user;
};

const refresh = async (cookies) => {
  if (!cookies?.jwt) throw new ApiError(StatusCodes.UNAUTHORIZED, 'No refresh token found in the cookies!');
  const refreshToken = cookies.jwt;
  const user = await getUserByRefreshToken(refreshToken);
  if (!user) throw new ApiError(StatusCodes.UNAUTHORIZED, 'User not found!');

  let accessToken;
  jwt.verify(refreshToken, envConfig.jwt.secret, (err, decoded) => {
    if (err || user?.email !== decoded.user?.email) throw new ApiError(StatusCodes.FORBIDDEN, 'Forbidden!'); // Forbidden
    const accessTokenExpires = moment().add(envConfig.jwt.accessExpirationMinutes, 'minutes');
    accessToken = tokenService.generateToken(
      {
        id: user._id.toString(),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      accessTokenExpires,
      tokenTypes.ACCESS,
    );
  });
  return accessToken;
};

module.exports = { signup, loginWithEmailAndPassword, refresh };
