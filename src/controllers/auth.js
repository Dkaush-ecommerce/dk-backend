const { StatusCodes } = require('http-status-codes');
const authService = require('../services/auth/authService');

const signup = async (req, res) => {
  try {
    const response = await authService.signup(req.body);
    return res.status(response.status).send(response);
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: 'failed',
      error: err,
    });
  }
};

const login = async (req, res) => {};

const logout = async (req, res) => {};

const refresh = async (req, res) => {};

module.exports = { signup, login, logout, refresh };
