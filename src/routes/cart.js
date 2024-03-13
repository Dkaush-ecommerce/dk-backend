const express = require('express');
const {
  addToCart,
  getCart,
  updateCart,
  deleteFromCart,
} = require('../controllers/cart');

const router = express.Router();

router.post('/', addToCart);
router.get('/:id', getCart);
router.put('/:id', updateCart);
router.delete('/:id', deleteFromCart);

module.exports = router;
