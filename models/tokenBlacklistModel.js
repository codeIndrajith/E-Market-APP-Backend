const mongoose = require('mongoose');

const tokenBlacklistModelSchema = mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
    newToken: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const TokenBlacklistModel = mongoose.model(
  'TokenBlacklistModel',
  tokenBlacklistModelSchema
);
module.exports = TokenBlacklistModel;
