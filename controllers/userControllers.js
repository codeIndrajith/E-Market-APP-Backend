const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const validateEmail = require('../validations/emailValidation');
const generateToken = require('../utils/generateToken');
const jwt = require('jsonwebtoken');
const { protect } = require('../middleware/authMiddleware');
const TokenBlacklistModel = require('../models/tokenBlacklistModel');
const Bit = require('../models/bitsModel');
const quickSort = require('../sort/quickSort');

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
    profileImage,
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
    profileImage,
  });
  if (user) {
    const token = generateToken(res, user._id);
    res.status(201).json({
      status: 'Success',
      accessToken: token,
      statusCode: res.statusCode,
      data: {
        userId: user._id,
        userEmail: user.userEmail,
      },
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
      status: 'Success',
      statusCode: res.statusCode,
      accessToken: newToken,
      data: {
        userId: user._id,
        userEmail: user.userEmail,
      },
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

  if (!accessToken) {
    res.status(400);
    throw new Error('Token is required');
  } else {
    await TokenBlacklistModel.create({
      token: accessToken,
      userId: decoded.userId,
    });
    res
      .status(201)
      .json({ status: 'Success', message: 'User logout successful' });
  }
});

// @desc    Get user profile
// routes   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({
    statusCode: res.statusCode,
    data: {
      userId: req.user._id,
      userName: req.user.firstName + ' ' + req.user.lastName,
      userEmail: req.user.userEmail,
    },
  });
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

    await user.save();
    res.status(200).json({
      statusCode: res.statusCode,
      status: 'Success',
      message: 'User Update Successful',
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
  let allBitAmounts = [];
  const users = await User.find({
    bitProducts: productId,
  });
  if (users) {
    for (const user of users) {
      const bitAmounts = await Bit.find({ bitUser: user._id });
      allBitAmounts.push(...bitAmounts);
    }
  }
  const bitAmounts = allBitAmounts.map(({ bitAmount }) => bitAmount);
  const sortAmount = quickSort(bitAmounts);

  const sortedBitAmounts = sortAmount.map((amount) =>
    allBitAmounts.find((item) => item.bitAmount === amount)
  );

  if (users) {
    res.status(201).json({
      status: 'Success',
      data: sortedBitAmounts,
    });
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
