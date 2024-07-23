const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  getAllProducts,
  getProduct,
  addProduct,
} = require('../controllers/productController');
const router = express.Router();

router.get('/', getAllProducts);
router.get('/:productId', getProduct);
router.post('/', protect, addProduct);

module.exports = router;
