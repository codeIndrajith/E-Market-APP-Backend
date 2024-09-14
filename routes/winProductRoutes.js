const express = require('express');
const {
  addWinProductDetails,
  getWinProductDetails,
  deleteWinProductDetails,
} = require('../controllers/winProductController');
const router = express.Router();

router.post('/add/details', addWinProductDetails);
router.get('/get/details', getWinProductDetails);
router.delete('/delete/details/:id', deleteWinProductDetails);

module.exports = router;
