const mongoose = require("mongoose");
const { Product } = require("./product");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const orderSchema = mongoose.Schema({
  orderId: Number,
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  products: [
    {
      productTitle: {
        type: String,
      },
      quantity: {
        type: Number,
      },
      price: {
        type: Number,
      },
      images: {
        type: String,
      },
      subTotal: {
        type: Number,
      },
      _id: {
        type: String,
      },
    },
  ],
  status: {
    type: String,
    default: "Pending",
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});
orderSchema.plugin(AutoIncrement, { inc_field: "orderId", start_seq: 5000603 });

orderSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
orderSchema.set("toJSON", {
  virtuals: true,
});

exports.Orders = mongoose.model("Orders", orderSchema);
exports.orderSchema = orderSchema;
