const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  getAllProducts,
  getProduct,
  addProduct,
  updateProductProfile,
  getUserProduct,
  deleteProduct,
  getWinProductDetails,
} = require('../controllers/productController');
const router = express.Router();

router.get('/', getAllProducts);
router.get('/user-products', protect, getUserProduct);
router.get('/winProductDetails/:productId', getWinProductDetails);
router.put('/:productId', protect, updateProductProfile);
router.delete('/:productId', protect, deleteProduct);
router.get('/:productId', getProduct);
router.post('/', protect, addProduct);

module.exports = router;
