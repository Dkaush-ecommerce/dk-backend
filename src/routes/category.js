const express = require('express');
const {
  getAllCategories,
  addCategory,
  deleteCategory,
  getCategoryById,
  getProductsByCategory,
} = require('../controllers/category');

const router = express.Router();

router.get('/', getAllCategories);
router.post('/', addCategory);
router.get('/:id', getCategoryById);
router.delete('/:id', deleteCategory);
router.get('/:id/products', getProductsByCategory);

module.exports = router;
