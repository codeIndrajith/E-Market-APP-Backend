const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const validateEmail = require('../validations/emailValidation');

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
    res.status(201).json({
      _id: user._id,
      userName: firstName + ' ' + lastName,
      userEmail: user.userEmail,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

module.exports = { registerUser };
