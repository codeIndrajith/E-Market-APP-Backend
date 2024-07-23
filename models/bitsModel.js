const mongoose = require('mongoose');
const User = require('./userModel');

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

bitsSchema.post('save', async function (doc, next) {
  try {
    await User.findByIdAndUpdate(doc.bitUser, { $inc: { bitCount: 1 } });
    next();
  } catch (error) {
    next(error);
  }
});

const Bit = mongoose.model('Bit', bitsSchema);
module.exports = Bit;
