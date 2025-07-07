const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  catName: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "",
  },
  price: {
    type: Number,
    default: 0,
  },
  oldPrice: {
    type: Number,
    default: 0,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  countInStock: {
    type: String,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  size: [
    {
      type: String,
      enum: ["Small", "Medium", "Large", "Supreme"], // Only allow these values
    },
  ],

  productSize: [
    {
      type: String,
    },
  ],
  rating: {
    type: Number,
    default: 0,
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

exports.Product = mongoose.model("Product", productSchema);
