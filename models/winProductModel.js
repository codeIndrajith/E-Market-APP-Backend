const mongoose = require('mongoose');

const winProductSchema = mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  productAmount: {
    type: Number,
    required: true,
  },
  productImage: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  sellerName: {
    type: String,
    required: true,
  },
  sellerProfileImage: {
    type: String,
    required: true,
  },
  sellerContactNumber: {
    type: Number,
    required: true,
  },
  sellerLocation: {
    type: String,
    required: true,
  },
  inProgress: {
    type: Boolean,
    required: true,
  },
});

const WinProduct = mongoose.model('WinProduct', winProductSchema);
module.exports = WinProduct;
