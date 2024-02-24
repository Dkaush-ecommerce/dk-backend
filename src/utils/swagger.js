const { version } = require('../../package.json');
const envConfig = require('../config/env');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Dkaush E-commerce API',
      version,
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    servers: [
      {
        url: `http://localhost:${envConfig.port}/api`,
        description: 'Development Server',
      },
    ],
  },
  apis: ['./src/routes/*.js', 'packages/components.yaml'],
};

module.exports = swaggerOptions;
