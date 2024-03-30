const IORedis = require('ioredis');
const envConfig = require('./env');

const connection = new IORedis(envConfig.redis.host, envConfig.redis.port, {
  password: envConfig.redis.password,
  maxRetriesPerRequest: 0,
});

module.exports = connection;
