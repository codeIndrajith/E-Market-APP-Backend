const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');
const Bit = require('../models/bitsModel');
const jwt = require('jsonwebtoken');

// @desc    Get all product
// routes   GET /api/products
// @access  Public
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();

  if (products && products.length > 0) {
    res.status(200).json({ products });
  } else {
    res.status(404);
    throw new Error('Products is not available');
  }
});

// @desc    Get Single product
// routes   GET /api/products/:productId
// @access  Public
const getProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  if (productId) {
    const product = await Product.findById({ _id: productId });
    if (product) {
      res.status(201).json({ product });
    } else {
      res.status(404);
      throw new Error('Product is not available');
    }
  } else {
    res.status(400);
    throw new Error('Product id is required');
  }
});

// @desc    Bit product by User
// routes   POST /api/products/bits/:productId
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

module.exports = { getAllProducts, getProduct, bitProductByUser };
