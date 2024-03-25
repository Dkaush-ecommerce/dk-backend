const express = require('express');
const { addToCart, getCart, deleteCart, deleteFromCart } = require('../controllers/cart');
const verifyJWT = require('../middlewares/verifyJwt');

const router = express.Router();

router.put('/add', verifyJWT, addToCart);
router.put('/items/delete', verifyJWT, deleteFromCart);
router.get('/me', verifyJWT, getCart);
router.put('/delete', verifyJWT, deleteCart);

module.exports = router;
