const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');
const Bit = require('../models/bitsModel');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// @desc    Add product
// routes   POST /api/products
// @access  Private
const addProduct = asyncHandler(async (req, res) => {
  const authHeader = req.headers['authorization'];
  const accessToken = authHeader && authHeader.split(' ')[1];
  const decode = jwt.decode(accessToken);
  const sellerDetails = await User.findById({ _id: decode.userId });
  let seller;
  if (sellerDetails) {
    const { firstName, lastName, contactNumber, city } = sellerDetails;
    seller = {
      name: `${firstName} ${lastName}`,
      contactNumber,
      location: city,
    };
  }
  const {
    productImage,
    category,
    productName,
    amount,
    startDate,
    endDate,
    location,
    startBitPrice,
  } = req.body;
  const addedProduct = await Product.create({
    productImage,
    category,
    productName,
    amount,
    startDate,
    endDate,
    location,
    startBitPrice,
    seller,
    user: decode.userId,
  });
  if (addedProduct) {
    res.status(200).json({ message: 'Product add successful' });
  } else {
    res.status(500);
    throw new Error('Product add fail');
  }
});

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

// @desc    Get Single product & Seller details
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

// @desc    Get Product Profile
// routes   GET /api/products/productProfile
// @access  Private
const getProductProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const addProduct = await Product.find({ user: user._id });

  if (addProduct && addProduct.length > 0) {
    res.status(200).json(addProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Update Product Profile
// routes   PUT /api/products/:productId
// @access  Private
const updateProductProfile = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findById(productId);

  if (product) {
    product.productImage = req.body.productImage || product.productImage;
    product.category = req.body.category || product.category;
    product.productName = req.body.productName || product.productName;
    product.amount = req.body.amount || product.amount;
    product.startDate = req.body.startDate || product.startDate;
    product.endDate = req.body.endDate || product.endDate;
    product.location = req.body.location || product.location;
    product.startBitPrice = req.body.startBitPrice || product.startBitPrice;

    const updatedProduct = await product.save();
    res.status(200).json({ message: 'Product Updated' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

module.exports = {
  getAllProducts,
  getProduct,
  addProduct,
  getProductProfile,
  updateProductProfile,
};
