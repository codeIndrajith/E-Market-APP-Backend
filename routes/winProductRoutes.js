const express = require('express');
const { addWinProductDetails } = require('../controllers/winProductController');
const router = express.Router();

router.post('/add/details', addWinProductDetails);

module.exports = router;
