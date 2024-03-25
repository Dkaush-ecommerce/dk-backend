const express = require('express');
const envConfig = require('../config/env');
const authRoutes = require('./auth');
const userRoutes = require('./user');
const cartRoutes = require('./cart');
const productRoutes = require('./product');
const categoryRoutes = require('./category');

const router = express.Router();

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

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
