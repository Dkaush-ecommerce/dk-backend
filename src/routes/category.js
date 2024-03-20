const express = require('express');
const {
  getAllCategories,
  addCategory,
  deleteCategory,
  getCategoryById,
  getProductsByCategory,
} = require('../controllers/category');
const verifyJWT = require('../middlewares/verifyJwt');
const authRole = require('../middlewares/authRole');
const ROLES = require('../utils/constants/roles');

const router = express.Router();

router.get('/', getAllCategories);
router.post('/', verifyJWT, authRole(ROLES.ADMIN), addCategory);
router.get('/:id', getCategoryById);
router.delete('/:id', verifyJWT, authRole(ROLES.ADMIN), deleteCategory);
router.get('/:id/products', getProductsByCategory);

module.exports = router;
