const { StatusCodes } = require('http-status-codes');
const envConfig = require('../config/env');

const errorHandler = (err, _req, res, _next) => {
  let { statusCode, message } = err;
  if (envConfig.nodeEnv === 'production' && !err.isOperational) {
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    message = 'Internal Server Error';
  }

  res.locals['errorMessage'] = err.message;

  const response = {
    code: statusCode,
    message,
    ...(envConfig.env === 'development' && { stack: err.stack }),
  };

  res.status(statusCode).send(response);
};

module.exports = errorHandler;
