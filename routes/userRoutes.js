const express = require('express');
const {
  registerUser,
  authUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getBitProductUsers,
  getAllUsers,
} = require('../controllers/userControllers');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', registerUser);
router.get('/', getAllUsers);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.get('/:productId', getBitProductUsers);

module.exports = router;
