const asyncHandler = require('express-async-handler');
const Checkout = require('../models/checkoutModel');
const WinProductModel = require('../models/winProductModel');

// @desc        Add a checkout details
// @route       POST /api/checkout/:id
// @access      Public
const addCheckoutDetails = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const addCheckout = await Checkout.create({
    bankName: req.body.bankName,
    cardNumber: req.body.cardNumber,
    expireDate: req.body.expireDate,
    CVV: req.body.CVV,
    total: req.body.total,
  });
  const winProDetails = await WinProductModel.findOne({ _id: id });
  if (addCheckout && winProDetails) {
    winProDetails.inProgress = req.body.inProgress;
    await winProDetails.save();
    res.status(201).json({
      success: true,
      message: 'checkout add successfully and progress updated',
    });
  } else {
    res.status(400);
    throw new Error('Checkout added and progress update fail');
  }
});

module.exports = { addCheckoutDetails };
