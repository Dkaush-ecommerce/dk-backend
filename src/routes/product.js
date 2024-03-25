const express = require('express');
const multer = require('multer');
const fs = require('fs');
const {
  addProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getAllProducts,
  getProductBySku,
  getTopProducts,
  bulkAddProducts,
} = require('../controllers/product');
const verifyJWT = require('../middlewares/verifyJwt');
const authRole = require('../middlewares/authRole');
const ROLES = require('../utils/constants/roles');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync('uploads')) {
      fs.mkdirSync('uploads');
    }
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
const router = express.Router();

router.post('/', verifyJWT, authRole(ROLES.ADMIN), addProduct);
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.put('/:id', verifyJWT, authRole(ROLES.ADMIN), updateProduct);
router.delete('/:id', verifyJWT, authRole(ROLES.ADMIN), deleteProduct);
router.get('/top', getTopProducts);
router.get('/sku/:sku', getProductBySku);
router.post('/bulk', verifyJWT, authRole(ROLES.ADMIN), upload.single(), bulkAddProducts);

module.exports = router;
