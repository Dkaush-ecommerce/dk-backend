const { StatusCodes } = require('http-status-codes');
const authService = require('../services/auth/authService');
const tokenService = require('../services/token/tokenService');
const catchAsync = require('../utils/catchAsync');

const signup = catchAsync(async (req, res) => {
  const user = await authService.signup(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  return res.status(StatusCodes.CREATED).send({ user, tokens });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  return res.status(StatusCodes.OK).send({ user, tokens });
});

const logout = catchAsync(async (req, res) => {});

const refresh = catchAsync(async (req, res) => {});

module.exports = { signup, login, logout, refresh };
