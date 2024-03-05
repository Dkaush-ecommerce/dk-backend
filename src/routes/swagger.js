const express = require('express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = require('../utils/swagger');
const envConfig = require('../config/env');

const router = express.Router();

const swaggerSpecs = swaggerJSDoc(swaggerOptions);

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

console.log(
  `Docs are available at http://localhost:${envConfig.port}/api/docs`
);
// Docs in JSON
router.get('/docs.json', (_, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpecs);
});

module.exports = router;
