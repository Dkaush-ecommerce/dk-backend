const express = require('express');
const { getAllReviews, createReview, removeReview, getReviewsByProduct } = require('../controllers/review');

const router = express.Router();

router.get('/', getAllReviews);
router.post('/', createReview);
router.delete('/', removeReview);
router.get('/products/:id', getReviewsByProduct);

module.exports = router;
