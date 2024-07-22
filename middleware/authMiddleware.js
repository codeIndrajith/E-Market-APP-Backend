const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const TokenBlacklistModel = require('../models/tokenBlacklistModel');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization) {
    try {
      token = req.headers.authorization.split(' ')[1];
      // Check if the token is blacklisted

      if (await TokenBlacklistModel.findOne({ token })) {
        return res
          .status(401)
          .json({ message: 'Not Authorized, token is blacklisted' });
      } else {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId).select('-password');
        next();
      }
    } catch (error) {
      res.status(401);
      throw new Error('Not Authorized, Invalid token');
    }
  } else {
    res.status(401);
    throw new Error('Not Authorized, no token');
  }
});

module.exports = { protect };
