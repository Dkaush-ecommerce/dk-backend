const { StatusCodes } = require('http-status-codes');
const ApiError = require('../errors/ApiError');

const verifyJWT = async (req, res, next) => {
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];
  if (!authHeader) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'No token provided!');
  }
  const accessToken = authHeader.split(' ').pop();
  const accessTokenPayload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY);
  req.user = accessTokenPayload.user;
  next();
};

module.exports = verifyJWT;
