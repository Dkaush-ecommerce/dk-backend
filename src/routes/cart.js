const express = require('express');
const { addToCart, getCart, deleteCart, deleteFromCart } = require('../controllers/cart');
const verifyJWT = require('../middlewares/verifyJwt');

const router = express.Router();

router.put('/:id', verifyJWT, addToCart);
router.put('/:id', verifyJWT, deleteFromCart);
router.get('/:id', verifyJWT, getCart);
router.put('/:id', verifyJWT, deleteCart);

module.exports = router;
