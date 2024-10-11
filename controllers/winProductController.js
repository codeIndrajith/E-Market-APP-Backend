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
// @method      GET /api/winProduct/get/details/:winUserId
// @access      Public
const getWinProductDetails = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  let winProDetails = await WinProductModel.find({ winUserId: userId });

  if (winProDetails) {
    const modifiedWinProDetails = winProDetails.map((product) => {
      const productObj = product.toObject();
      productObj.id = productObj._id;
      delete productObj._id;
      return productObj;
    });

    res.status(200).json({
      success: true,
      data: modifiedWinProDetails,
    });
  } else {
    res.status(404);
    throw new Error('Win product not found');
  }
});

// @desc        Get win product details
// @method      GET /api/winProduct/getOne/details/:id
// @access      Public
const getOneWinProDetails = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const winProDetails = await WinProductModel.findOne({ _id: id });
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
      msg: 'Deleted success',
    });
  } else {
    res.status(404);
    throw new Error('Win product not found');
  }
});

// @desc        Update inProgress value
// @method      PUT /api/winProduct/update/inProgress/:id
// @access      Public
const updateInProgressValue = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { inProgress } = req.body;
  const winProDetails = await WinProductModel.findOne({ _id: id });
  if (winProDetails) {
    winProDetails.inProgress = inProgress;
    await winProDetails.save();
    res.status(200).json({
      success: true,
      msg: 'inProgress updated',
    });
  } else {
    res.status(404);
    throw new Error('Win product not found');
  }
});

module.exports = {
  addWinProductDetails,
  getWinProductDetails,
  getOneWinProDetails,
  deleteWinProductDetails,
  updateInProgressValue,
};
