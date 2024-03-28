const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const { StatusCodes } = require('http-status-codes');
const User = require('../db/models/User');
const Admin = require('../db/models/Admin');
const ApiError = require('../errors/ApiError');
const { getUserByEmail, getUserByRefreshToken } = require('./userService');
const { getAdminByRefreshToken, getAdminByEmail } = require('./adminService');
const envConfig = require('../config/env');
const tokenService = require('./tokenService');
const tokenTypes = require('../utils/constants/tokenTypes');
const ROLES = require('../utils/constants/roles');

const signup = async (userObj, role) => {
  try {
    const hashedPassword = await bcrypt.hash(userObj.password, 12);
    if (role === ROLES.USER) {
      if (await User.isEmailTaken(userObj.email)) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Email already taken!');
      }
      const user = await User.create({
        email: userObj.email,
        password: hashedPassword,
        firstName: userObj.firstName,
        lastName: userObj.lastName,
      });
      return user;
    } else if (role === ROLES.ADMIN) {
      if (await Admin.isEmailTaken(userObj.email)) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Email already taken!');
      }
      const admin = await Admin.create({
        email: userObj.email,
        password: hashedPassword,
        firstName: userObj.firstName,
        lastName: userObj.lastName,
      });
      return admin;
    }
  } catch (error) {
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

const loginWithEmailAndPassword = async (email, password, role) => {
  let user;
  if (role === ROLES.USER) {
    user = await getUserByEmail(email);
  } else if (role === ROLES.ADMIN) {
    user = await getAdminByEmail(email);
  }
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Incorrect email or password');
  }
  return user;
};

const refresh = async (cookies, role) => {
  if (!cookies?.jwt) throw new ApiError(StatusCodes.UNAUTHORIZED, 'No refresh token found in the cookies!');
  const refreshToken = cookies.jwt;
  let user;
  if (role === ROLES.USER) {
    user = await getUserByRefreshToken(refreshToken);
  } else if (role === ROLES.ADMIN) {
    user = await getAdminByRefreshToken(refreshToken);
  }
  if (!user) throw new ApiError(StatusCodes.UNAUTHORIZED, 'User not found!');
  let accessToken;
  jwt.verify(refreshToken, envConfig.jwt.secret, (err, decoded) => {
    if (err) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, 'Session has expired!');
    }
    if (user?.email !== decoded.user?.email) throw new ApiError(StatusCodes.FORBIDDEN, 'Forbidden!');
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
