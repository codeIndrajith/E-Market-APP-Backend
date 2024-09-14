const express = require('express');
const {
  addWinProductDetails,
  getWinProductDetails,
  deleteWinProductDetails,
  updateInProgressValue,
} = require('../controllers/winProductController');
const router = express.Router();

router.post('/add/details', addWinProductDetails);
router.get('/get/details', getWinProductDetails);
router.delete('/delete/details/:id', deleteWinProductDetails);
router.put('/update/inProgress/:id', updateInProgressValue);

module.exports = router;
