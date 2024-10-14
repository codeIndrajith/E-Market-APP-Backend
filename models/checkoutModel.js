const mongoose = require('mongoose');

const checkoutSchema = mongoose.Schema(
  {
    bankName: {
      type: String,
      required: true,
    },
    cardNumber: {
      type: Number,
      required: true,
    },
    expireDate: {
      type: String,
      required: true,
    },
    CVV: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Checkout = mongoose.model('Checkout', checkoutSchema);
module.exports = Checkout;
