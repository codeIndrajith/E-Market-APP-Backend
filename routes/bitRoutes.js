const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  getAllBits,
  bitProductByUser,
  getBitProduct,
  userBitProducts,
} = require('../controllers/bitControllers');
const router = express.Router();

router.get('/', getAllBits);
router.get('/user-bits', protect, userBitProducts);
router.post('/:productId', protect, bitProductByUser);
router.get('/:productId', getBitProduct);

module.exports = router;
