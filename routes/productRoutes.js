const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  getAllProducts,
  getProduct,
} = require('../controllers/productController');
const router = express.Router();

router.get('/', getAllProducts);
router.get('/:productId', getProduct);

module.exports = router;
