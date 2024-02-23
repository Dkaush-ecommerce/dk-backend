const moment = require('moment');
const jwt = require('jsonwebtoken');
const envConfig = require('../../config/env');
const tokenTypes = require('./token.types');

const generateToken = (
  user,
  expires,
  type,
  secret = envConfig.jwt.secret
) => {
  const payload = {
    sub: user,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

const generateAuthTokens = async (user) => {
  const accessTokenExpires = moment().add(
    envConfig.jwt.accessExpirationMinutes,
    'minutes'
  );
  const accessToken = generateToken(
    user,
    accessTokenExpires,
    tokenTypes.ACCESS
  );
  const refreshTokenExpires = moment().add(
    envConfig.jwt.refreshExpirationDays,
    'days'
  );
  const refreshToken = generateToken(
    user,
    refreshTokenExpires,
    tokenTypes.REFRESH
  );

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};

module.exports = { generateToken, generateAuthTokens };
