const express = require('express');
const {
  addProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getAllProducts,
  getProductsByCategory,
  getProductBySku,
  getTopProducts,
} = require('../controllers/product');

const router = express.Router();

router.post('/:id', addProduct);
router.get('/all', getAllProducts);
router.get('/category/:id', getProductsByCategory);
router.get('/sku/:sku', getProductBySku);
router.get('/top', getTopProducts);
router.get('/:id', getProductById);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
