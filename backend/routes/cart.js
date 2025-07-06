const { Cart } = require("../models/cart");
const express = require("express");
const router = express.Router();

// Get all cart items
router.get("/", async (req, res) => {
  try {
    const cartList = await Cart.find(req.query);
    if (!cartList || cartList.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No cart items found" });
    }
    res.status(200).json(cartList);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
});

// Add item to cart
router.post("/add", async (req, res) => {
  const Item = await Cart.findById(req.body.productId);
  try {
    let cartItem = new Cart({
      productTitle: req.body.productTitle,
      images: req.body.images,
      rating: req.body.rating,
      price: req.body.price,
      quantity: req.body.quantity,
      subTotal: req.body.subTotal,
      productId: req.body.productId,
      userId: req.body.userId,
      size: req.body.size,
    });
    cartItem = await cartItem.save();
    res.status(201).json(cartItem);
  } catch (err) {
    console.error("Cart Add Error:", err); // 🔥 Log error
    res.status(500).json({
      error: err.message,
      success: false,
    });
  }
});

// Delete cart item
router.delete("/:id", async (req, res) => {
  try {
    const cartItem = await Cart.findById(req.params.id);
    if (!cartItem) {
      return res.status(404).json({
        message: "The cart item with given ID was not found!",
        success: false,
      });
    }

    await Cart.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ success: true, message: "Cart item deleted successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
});

// Update cart item
router.put("/:id", async (req, res) => {
  try {
    const cartItem = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        productTitle: req.body.productTitle,
        images: req.body.images,
        rating: req.body.rating,
        price: req.body.price,
        quantity: req.body.quantity,
        subTotal: req.body.subTotal,
        productId: req.body.productId,
        userId: req.body.userId,
        size: req.body.size,
      },
      { new: true }
    );

    if (!cartItem) {
      return res
        .status(404)
        .json({ message: "Cart item not found!", success: false });
    }

    res.status(200).json(cartItem);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
});
router.get("/:id", async (req, res) => {
  const catrItem = await Cart.findById(req.params.id);

  if (!catrItem) {
    res
      .status(500)
      .json({ message: "The cart item with the given ID was not found." });
  }
  return res.status(200).send(catrItem);
});
router.get(`/count`, async (req, res) => {
  const cartItemsCount = await Cart.countDocuments();
  if (!cartItemsCount) {
    res.status(500).json({ success: false });
  }
  return res.status(200).json(cartItemsCount);
});
module.exports = router;
