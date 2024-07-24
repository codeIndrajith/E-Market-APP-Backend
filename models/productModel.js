const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
  {
    productImage: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: [
        'Vegetables',
        'Fruits',
        'Meat, Eggs and Seafood',
        'Dairy Products',
        'Spices and Condiments',
        'Sweets and Snacks',
        'Grains and Cereals',
      ],
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
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
    location: {
      type: String,
      required: true,
    },
    startBitPrice: {
      type: Number,
    },
    seller: [
      {
        name: {
          type: String,
        },
        contactNumber: {
          type: String,
        },
        location: {
          type: String,
        },
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
