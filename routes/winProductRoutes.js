const express = require('express');
const {
  addWinProductDetails,
  getWinProductDetails,
  deleteWinProductDetails,
  updateInProgressValue,
  getOneWinProDetails,
} = require('../controllers/winProductController');
const router = express.Router();

router.post('/add/details', addWinProductDetails);
router.get('/get/details', getWinProductDetails);
router.get('/getOne/details/:id', getOneWinProDetails);
router.delete('/delete/details/:id', deleteWinProductDetails);
router.put('/update/inProgress/:id', updateInProgressValue);

module.exports = router;
