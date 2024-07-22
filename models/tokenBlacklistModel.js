const mongoose = require('mongoose');

const tokenBlacklistModelSchema = mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
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
