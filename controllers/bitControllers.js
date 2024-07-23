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

// @desc    Get bits product by user & GET all bits in single product
// routes   GET /api/bits/:productId
// @access  Public
const getBitProductByUser = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const bits = await Bit.find({ bitProduct: productId });
  let bitUserId = [];
  let users = [];

  if (bits) {
    bitUserId = bits.map((element) => element.bitUser);
    for (const userId of bitUserId) {
      const user = await User.findById(userId);
      if (user) {
        users.push(user);
      }
    }
    res.status(201).json({ bitUsers: users, bitProduct: bits });
  } else {
    res.status(404);
    throw new Error('Bit users not found');
  }
});

module.exports = { bitProductByUser, getAllBits, getBitProductByUser };
