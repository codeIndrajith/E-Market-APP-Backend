const mongoose = require('mongoose');

const bitsSchema = mongoose.Schema(
  {
    bitAmount: {
      type: String,
    },
    bitProduct: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
    bitUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const Bit = mongoose.model('Bit', bitsSchema);
module.exports = Bit;
