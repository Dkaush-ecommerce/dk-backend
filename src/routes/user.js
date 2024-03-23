const express = require('express');
const { getUserById, getWishlist } = require('../controllers/user');
const verifyJWT = require('../middlewares/verifyJwt');

const router = express.Router();

router.get('/', verifyJWT, getUserById);
router.get('/wishlist', getWishlist, getWishlist);

module.exports = router;
