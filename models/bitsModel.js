const mongoose = require('mongoose');
const User = require('./userModel');

const bitsSchema = mongoose.Schema(
  {
    bitAmount: {
      type: Number,
    },
    bitProduct: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
    bitUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    bitUsername: {
      type: String,
    },
    bitUserprofileImage: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

bitsSchema.post('save', async function (doc, next) {
  try {
    await User.findByIdAndUpdate(doc.bitUser, {
      $inc: { bitCount: 1 },
      $push: { bitProducts: doc.bitProduct },
    });
    next();
  } catch (error) {
    next(error);
  }
});

const Bit = mongoose.model('Bit', bitsSchema);
module.exports = Bit;
