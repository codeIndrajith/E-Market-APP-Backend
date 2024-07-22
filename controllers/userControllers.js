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
    await TokenBlacklistModel.deleteMany();
    const token = generateToken(res, user._id);
    res.status(201).json({
      accessToken: token,
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

  if (!accessToken) {
    res.status(400);
    throw new Error('Token is required');
  } else {
    await TokenBlacklistModel.create({ token: accessToken });
    res.status(201).json({ message: 'User logout successful' });
  }
});

// @desc    Get user profile
// routes   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  res.send(req.user);
});

module.exports = { registerUser, authUser, logoutUser, getUserProfile };
