const { StatusCodes } = require('http-status-codes');
const ApiError = require('../errors/ApiError');
const jwt = require('jsonwebtoken');
const envConfig = require('../config/env');
const catchAsync = require('../utils/catchAsync');

const verifyJWT = catchAsync((req, res, next) => {
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];
  if (!authHeader) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'No token provided!');
  }
  const accessToken = authHeader.split(' ').pop();
  try {
    const accessTokenPayload = jwt.verify(accessToken, envConfig.jwt.secret);
    req.user = accessTokenPayload.user;
    next();
  } catch (err) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Token expired!');
  }
});

module.exports = verifyJWT;
