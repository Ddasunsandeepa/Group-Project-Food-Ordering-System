const { Orders } = require("../models/orders");
const express = require("express");
const router = express.Router();

//get all list

router.get("/", async (req, res) => {
  try {
    const orderList = await Orders.find();

    if (!orderList || orderList.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No orders found" });
    }

    res.status(200).json({ success: true, data: orderList });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

//get by id

router.get("/:id", async (req, res) => {
  try {
    const order = await Orders.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "The order with the given ID was not found",
      });
    }

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

//create category

router.post("/create", async (req, res) => {
  let order = new Orders({
    name: req.body.name,
    phone: req.body.phone,
    userId: req.body.userId,
    email: req.body.email,
    amount: req.body.amount,
    products: req.body.products,
  });

  if (!order) {
    res.status(500).json({
      error: "Order creation failed",
      success: false,
    });
  }
  order = await order.save();
  res.status(201).json(order);
  // console.log(order);
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedOrder = await Orders.findByIdAndDelete(req.params.id);

    if (!deletedOrder) {
      return res.status(404).json({
        message: "Order not found!",
        success: false,
      });
    }

    res.status(200).json({
      success: true,
      message: "Order deleted!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
      error: error.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedOrder = await Orders.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        phone: req.body.phone,
        userId: req.body.userId,
        email: req.body.email,
        amount: req.body.amount,
        products: req.body.products,
        status: req.body.status,
      },
      { new: true } // ✅ returns updated document
    );

    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found or cannot be updated!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order updated successfully",
      data: updatedOrder,
    });
  } catch (error) {
    console.error("Order update error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while updating order",
    });
  }
});

module.exports = router;
