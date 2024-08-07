const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');
const Bit = require('../models/bitsModel');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// @desc    Add product
// routes   POST /api/products
// @access  Private
const addProduct = asyncHandler(async (req, res) => {
  const sellerDetails = await User.findById({ _id: req.user._id });
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
    user: req.user._id,
  });
  if (addedProduct) {
    res.status(201).json({
      status: 'Success',
      message: 'Product add successful',
    });
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
    res.status(200).json({
      status: 'Success',
      data: [
        {
          AllProducts: products.map((product) => ({
            productId: product._id,
            productName: product.productName,
            productImage: product.productImage,
            category: product.category,
            amount: product.amount,
            startDate: product.startDate,
            endDate: product.endDate,
          })),
        },
      ],
    });
  } else {
    res.status(404);
    throw new Error('Products is not available');
  }
});

// @desc    Get user products
// routes   GET /api/products/user-products
// @access  Private
const getUserProduct = asyncHandler(async (req, res) => {
  const userProduct = await Product.find({ user: req.user._id });
  if (userProduct) {
    res.status(200).json({
      status: 'Success',
      statusCode: res.statusCode,
      data: [
        {
          myProducts: userProduct.map((product) => ({
            productId: product._id,
            productName: product.productName,
            image: product.productImage,
            amount: product.amount,
            startDate: product.startDate,
            endDate: product.endDate,
          })),
        },
      ],
    });
  } else {
    res.status(404);
    throw new Error('User products have not found');
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
      res.status(200).json({
        status: 'Success',
        data: {
          ProductDetails: [
            {
              productName: product.productName,
              productAmount: product.amount,
              location: product.location,
              startDate: product.startDate,
              endDate: product.endDate,
            },
          ],
          SellerDetails: [
            {
              sellerName: product.seller[0].name,
              sellerContactNumber: product.seller[0].contactNumber,
              sellerLocation: product.seller[0].location,
            },
          ],
        },
      });
    } else {
      res.status(404);
      throw new Error('Product is not available');
    }
  } else {
    res.status(400);
    throw new Error('Product id is required');
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

    await product.save();
    res.status(200).json({ status: 'Success', message: 'Product Updated' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

module.exports = {
  getAllProducts,
  getProduct,
  getUserProduct,
  addProduct,
  updateProductProfile,
};
