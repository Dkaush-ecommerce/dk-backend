require('dotenv').config({ path: '.env' });

const envConfig = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV,
  mongoUri: process.env.MONGODB_URI,
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    accessExpirationMinutes: process.env.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: process.env.JWT_REFRESH_EXPIRATION_DAYS,
    cookieOptions: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      signed: true,
    },
  },
};

module.exports = envConfig;
