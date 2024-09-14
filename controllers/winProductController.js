const WinProductModel = require('../models/winProductModel');
const asyncHandler = require('express-async-handler');

// @desc        Add win product and seller detail
// @method      POST /api/winProduct/add/details
// @access      Public
const addWinProductDetails = asyncHandler(async (req, res) => {
  const addWinProDetails = await WinProductModel.create(req.body);
  if (addWinProDetails) {
    res.status(201).json({
      success: true,
      message: 'Win details add success',
    });
  } else {
    res.status(400);
    throw new Error('Add fail');
  }
});

// @desc        Get win product details
// @method      GET /api/winProduct/get/details
// @access      Public
const getWinProductDetails = asyncHandler(async (req, res) => {
  const winProDetails = await WinProductModel.find({});
  if (winProDetails) {
    res.status(200).json({
      success: true,
      data: winProDetails,
    });
  } else {
    res.status(404);
    throw new Error('Win product not found');
  }
});

// @desc        Delete win product details
// @method      DELETE /api/winProduct/delete/details/:id
// @access      Public
const deleteWinProductDetails = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const winProDetails = await WinProductModel.findOne({ _id: id });
  if (winProDetails) {
    await winProDetails.deleteOne();
    res.status(200).json({
      success: true,
      mgs: 'Deleted success',
    });
  } else {
    res.status(404);
    throw new Error('Win product not found');
  }
});

module.exports = {
  addWinProductDetails,
  getWinProductDetails,
  deleteWinProductDetails,
};
