const Bit = require('../models/bitsModel');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// @desc    Bit product by User
// routes   POST /api/bits/:productId
// @access  Private
const bitProductByUser = asyncHandler(async (req, res) => {
  const { bitAmount } = req.body;
  const { productId } = req.params;
  const authHeader = req.headers['authorization'];
  const accessToken = authHeader && authHeader.split(' ')[1];
  const decode = jwt.decode(accessToken);

  if (bitAmount > 30030) {
    res.status(400);
    throw new Error('Bit amount need to be less than RS.30030.00');
  } else {
    const addedBitAmount = await Bit.create({
      bitAmount,
      bitProduct: productId,
      bitUser: decode.userId,
    });
    res
      .status(201)
      .json({ message: 'Product bit add successful', bit: addedBitAmount });
  }
});

// @desc    Get All bits
// routes   GET /api/bits
// @access  Public
const getAllBits = asyncHandler(async (req, res) => {
  const bits = await Bit.find({});
  if (bits && bits.length > 0) {
    res.status(201).json({ bits });
  } else {
    res.status(404);
    throw new Error('Bits not found');
  }
});

// @desc    Get bits single product
// routes   GET /api/bits/:productId
// @access  Public
const getBitProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const bitProduct = await Bit.find({ bitProduct: productId });
  if (bitProduct) {
    res.status(200).json(bitProduct);
  } else {
    res.status(404);
    throw new Error('Bit product not found');
  }
});

module.exports = { bitProductByUser, getAllBits, getBitProduct };
