const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  getAllProducts,
  getProduct,
  addProduct,
  getProductProfile,
  updateProductProfile,
  getUserProduct,
} = require('../controllers/productController');
const router = express.Router();

router.get('/', getAllProducts);
router.get('/user-products', protect, getUserProduct);
router.get('/profile', protect, getProductProfile);
router.put('/:productId', protect, updateProductProfile);
router.get('/:productId', getProduct);
router.post('/', protect, addProduct);

module.exports = router;
