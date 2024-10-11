const express = require('express');
const { addCheckoutDetails } = require('../controllers/checkoutController');
const router = express.Router();

router.post('/', addCheckoutDetails);

module.exports = router;
