const express = require('express');
const docsRoute = require('./swagger');
const envConfig = require('../config/env');
const authRoutes = require('./auth');
const userRoutes = require('./user');
const cartRoutes = require('./cart');
const productRoutes = require('./product');
const categoryRoutes = require('./category');

const router = express.Router();

/**
 * @swagger
 * /health:
 *  get:
 *     tags:
 *     - Healthcheck
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
router.get('/health', (_, res) => {
  res.json({ message: 'Hello from server!' });
});

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/carts',
    route: cartRoutes,
  },
  {
    path: '/products',
    route: productRoutes,
  },
  {
    path: '/categories',
    route: categoryRoutes,
  },
];

const devRoutes = [
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

if (envConfig.nodeEnv === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
