const Bit = require('../models/bitsModel');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const Product = require('../models/productModel');

// @desc    Bit product by User
// routes   POST /api/bits/:productId
// @access  Private
const bitProductByUser = asyncHandler(async (req, res) => {
  const { bitAmount } = req.body;
  const { productId } = req.params;

  if (bitAmount > 30030) {
    res.status(400);
    throw new Error('Bit amount need to be less than RS.30030.00');
  } else {
    const existBid = await Bit.findOne({
      bitUser: req.user._id,
      bitProduct: productId,
    });

    if (existBid) {
      existBid.bitAmount = bitAmount;
      await existBid.save();
    } else {
      const addedBitAmount = await Bit.create({
        bitAmount,
        bitProduct: productId,
        bitUser: req.user._id,
        bitUsername: req.user.firstName + ' ' + req.user.lastName,
        bitUserprofileImage: req.user.profileImage,
      });
    }
    res.status(201).json({
      status: 'Success',
      statusCode: res.statusCode,
      message: 'Product bit add successful',
    });
  }
});

// @desc    Get All bits
// routes   GET /api/bits
// @access  Public
const getAllBits = asyncHandler(async (req, res) => {
  const bits = await Bit.find({});
  if (bits && bits.length > 0) {
    res.status(200).json({
      status: 'Success',
      data: bits,
    });
  } else {
    res.status(404);
    throw new Error('Bits not found');
  }
});

// @desc    Get All Bids single Product
// routes   GET /api/bits/:productId
// @access  Public
const getBitProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const bitProduct = await Bit.find({ bitProduct: productId });
  if (bitProduct && bitProduct.length > 0) {
    res.status(200).json({
      status: 'Success',
      statusCode: res.statusCode,
      data: bitProduct.map((bitProd) => ({
        bidUser: bitProd.bitUsername,
        bidId: bitProd._id,
        bitAmount: bitProd.bitAmount,
      })),
    });
  } else {
    res.status(404);
    throw new Error('There are not bids this product');
  }
});

// @desc    Get user bits
// routes   GET /api/bits/user-bits
// @access  Private
const userBitProducts = asyncHandler(async (req, res) => {
  const userBitProducts = await Bit.find({ bitUser: req.user._id });
  const products = [];

  for (const product of userBitProducts) {
    const foundProduct = await Product.findById({ _id: product.bitProduct });
    if (foundProduct) {
      products.push({
        productId: foundProduct._id,
        productName: foundProduct.productName,
        image: foundProduct.productImage,
        amount: foundProduct.amount,
        startDate: foundProduct.startDate,
        endDate: foundProduct.endDate,
      });
    }
  }

  if (products.length > 0) {
    res.status(200).json({
      status: 'Success',
      statusCode: res.statusCode,
      data: { userBitAllProducts: products },
    });
  } else {
    res.status(404);
    throw new Error('User bit products have not been found');
  }
});

// @desc    Update user Bid
// routes   PUT /api/bits/:productId
// @access  Private
const updateBit = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const product = await Bit.findOne({
    bitProduct: productId,
    bitUser: req.user._id,
  });

  if (product) {
    product.bitAmount = req.body.bitAmount || bitAmount;
    await product.save();
    res.status(200).json({
      status: 'Success',
      message: 'Bid Amount Update Successful',
    });
  } else {
    res.status(404);
    throw new Error('Updated product not found');
  }
});

// @desc    Delete user Bid
// routes   DELETE /api/bits/:productId
// @access  Private
const deleteBid = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const product = await Bit.findOne({
    bitProduct: productId,
    bitUser: req.user._id,
  });

  if (product) {
    await product.deleteOne();
    res.status(200).json({
      status: 'Success',
      message: 'Bid Delete successful',
    });
  } else {
    res.status(404);
    throw new Error('Bid details not found');
  }
});

module.exports = {
  bitProductByUser,
  getAllBits,
  getBitProduct,
  userBitProducts,
  updateBit,
  deleteBid,
};
