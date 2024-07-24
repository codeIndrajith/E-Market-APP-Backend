const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const validateEmail = require('../validations/emailValidation');
const generateToken = require('../utils/generateToken');
const jwt = require('jsonwebtoken');
const { protect } = require('../middleware/authMiddleware');
const TokenBlacklistModel = require('../models/tokenBlacklistModel');

// @desc    Register a new user
// routes   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    userEmail,
    contactNumber,
    city,
    password,
    confirmPassword,
  } = req.body;

  const emailValidation = validateEmail(userEmail);
  if (!emailValidation) {
    res.status(400); // this is bad request
    throw new Error('Email should valid');
  }

  if (password !== confirmPassword) {
    res.status(400);
    throw new Error('Password not matching');
  }

  const userExist = await User.findOne({ userEmail });
  if (userExist) {
    res.status(400);
    throw new Error('user already exist');
  }

  // create a user
  const user = await User.create({
    firstName,
    lastName,
    userEmail,
    contactNumber,
    city,
    password,
  });
  if (user) {
    const token = generateToken(res, user._id);
    res.status(201).json({
      accessToken: token,
      _id: user._id,
      userName: firstName + ' ' + lastName,
      userEmail: user.userEmail,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Auth user/set token
// routes   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const emailValidation = validateEmail(email);
  if (!emailValidation) {
    res.status(400);
    throw new Error('Email should valid');
  }

  const user = await User.findOne({ userEmail: email });

  if (user && (await user.matchPassword(password))) {
    const newToken = generateToken(res, user._id);
    res.status(201).json({
      accessToken: newToken,
      _id: user._id,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Logout user
// routes   POST /api/users/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
  const authHeader = req.headers['authorization'];
  const accessToken = authHeader && authHeader.split(' ')[1];
  const decoded = jwt.decode(accessToken, { complete: true });
  decoded.payload.exp = 0;

  if (!accessToken) {
    res.status(400);
    throw new Error('Token is required');
  } else {
    await TokenBlacklistModel.create({
      token: accessToken,
      userId: decoded.payload.userId,
    });
    res.status(201).json({ message: 'User logout successful' });
  }
});

// @desc    Get user profile
// routes   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    userName: req.user.firstName + ' ' + req.user.lastName,
    userEmail: req.user.userEmail,
  };
  res.status(200).json(user);
});

// @desc    Update user profile
// routes   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.userEmail = req.body.userEmail || user.userEmail;
    user.contactNumber = req.body.contactNumber || user.contactNumber;
    user.city = req.body.city || user.city;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.firstName + ' ' + updatedUser.lastName,
      userEmail: updatedUser.userEmail,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get users to bit single product
// routes   GET /api/users/:productId
// @access  Public
const getBitProductUsers = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const users = await User.find({ bitProducts: productId });

  if (users) {
    res.status(201).json({ bitUsers: users });
  } else {
    res.status(404);
    throw new Error('Bit users not found');
  }
});

module.exports = {
  registerUser,
  authUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getBitProductUsers,
};
