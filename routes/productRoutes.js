const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  getAllProducts,
  getProduct,
  bitProductByUser,
} = require('../controllers/productController');
const router = express.Router();

router.get('/', getAllProducts);
router.get('/:productId', getProduct);
router.post('/bits/:productId', protect, bitProductByUser);

module.exports = router;
