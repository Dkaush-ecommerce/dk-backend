require('dotenv').config();

const envConfig = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
};

module.exports = envConfig;
