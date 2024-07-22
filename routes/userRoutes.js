const express = require('express');
const {
  registerUser,
  authUser,
  logoutUser,
  getUserProfile,
} = require('../controllers/userControllers');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.get('/profile', protect, getUserProfile);

module.exports = router;
