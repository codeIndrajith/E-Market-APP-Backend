const express = require('express');
const { addCheckoutDetails } = require('../controllers/checkoutController');
const router = express.Router();

router.post('/:id', addCheckoutDetails);

module.exports = router;
