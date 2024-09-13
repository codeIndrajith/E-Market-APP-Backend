const WinProductModel = require('../models/winProductModel');
const asyncHandler = require('express-async-handler');

// @desc        Add win product and seller detail
// @method      POST /api/winProduct/add/details
// @access      Public
const addWinProductDetails = asyncHandler(async (req, res) => {
  const addWinProDetails = await WinProductModel.create(req.body);
  if (addWinProDetails) {
    res
      .status(201)
      .json({
        success: true,
        message: 'Win details add success',
        data: addWinProDetails,
      });
  } else {
    res.status(400);
    throw new Error('Add fail');
  }
});

module.exports = { addWinProductDetails };
