const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  getAllBits,
  bitProductByUser,
  getBitProductByUser,
} = require('../controllers/bitControllers');
const router = express.Router();

router.get('/', getAllBits);
router.post('/:productId', protect, bitProductByUser);
router.get('/:productId', getBitProductByUser);

module.exports = router;
