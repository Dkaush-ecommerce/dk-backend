const express = require('express');
const {
  getAllCategories,
  addCategory,
  deleteCategory,
  getCategoryById,
} = require('../controllers/category');

const router = express.Router();

router.get('/all', getAllCategories);
router.post('/:id', addCategory);
router.get('/:id', getCategoryById);
router.delete('/:id', deleteCategory);

module.exports = router;
