const asyncHandler = require('express-async-handler');
const Checkout = require('../models/checkoutModel');

// @desc        Add a checkout details
// @route       POST /api/checkout
// @access      Public
const addCheckoutDetails = asyncHandler(async (req, res) => {
  const addCheckout = await Checkout.create(req.body);
  if (addCheckout) {
    res
      .status(201)
      .json({ success: true, message: 'checkout add successfully' });
  } else {
    res.status(400);
    throw new Error('Checkout added fail');
  }
});

module.exports = { addCheckoutDetails };
