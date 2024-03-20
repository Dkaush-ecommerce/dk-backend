const { StatusCodes } = require('http-status-codes');
const authService = require('../services/auth/authService');
const tokenService = require('../services/token/tokenService');
const catchAsync = require('../utils/catchAsync');
const { setCookie, clearCookie } = require('../common/cookie');
const { getUserByRefreshToken } = require('../services/user/userService');

const signup = catchAsync(async (req, res) => {
  const user = await authService.signup(req.body);
  const userDetails = {
    id: user._id.toString(),
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: req.params.role,
  };
  const { refreshToken, accessToken } = await tokenService.generateAuthTokens(
    userDetails
  );
  user.refreshToken = refreshToken;
  await user.save();
  setCookie(res, 'jwt', refreshToken);
  return res.status(StatusCodes.CREATED).send({
    user: userDetails,
    token: accessToken,
  });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginWithEmailAndPassword(email, password);
  const userDetails = {
    id: user._id.toString(),
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: req.params.role,
  };
  const { refreshToken, accessToken } = await tokenService.generateAuthTokens(
    userDetails
  );
  user.refreshToken = refreshToken;
  await user.save();
  setCookie(res, 'jwt', refreshToken);
  return res.status(StatusCodes.OK).send({
    user: userDetails,
    token: accessToken,
  });
});

const logout = catchAsync(async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(StatusCodes.NO_CONTENT);
  const refreshToken = cookies.jwt;
  const user = await getUserByRefreshToken(refreshToken);
  if (!user) {
    clearCookie(res, 'jwt');
    return res.sendStatus(StatusCodes.NO_CONTENT);
  }
  user.refreshToken = '';
  await user.save();
  clearCookie(res, 'jwt');
  return res.sendStatus(StatusCodes.NO_CONTENT);
});

const refresh = catchAsync(async (req, res) => {
  const cookies = req.cookies;
  const accessToken = await authService.refresh(cookies);
  return res.status(StatusCodes.OK).send({ accessToken });
});

module.exports = { signup, login, logout, refresh };
