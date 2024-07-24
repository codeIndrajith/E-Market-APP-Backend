const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  getAllBits,
  bitProductByUser,
  getBitProduct,
} = require('../controllers/bitControllers');
const router = express.Router();

router.get('/', getAllBits);
router.post('/:productId', protect, bitProductByUser);
router.get('/:productId', getBitProduct);

module.exports = router;
