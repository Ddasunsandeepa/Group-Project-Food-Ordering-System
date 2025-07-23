const { MyList } = require("../models/myList");
const express = require("express");
const router = express.Router();

// Get all MyList items
router.get("/", async (req, res) => {
  try {
    const myList = await MyList.find(req.query);
    if (!myList || myList.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No items found" });
    }
    res.status(200).json(myList);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
});

// Add item to MyList
router.post("/add", async (req, res) => {
  try {
    const itemExists = await MyList.findOne({
      productId: req.body.productId,
      userId: req.body.userId,
    });

    if (itemExists) {
      return res
        .status(400)
        .json({ success: false, message: "Product already in MyList" });
    }

    const list = new MyList({
      productTitle: req.body.productTitle,
      images: req.body.images, // Ensure this matches the schema
      rating: req.body.rating,
      price: req.body.price,
      productId: req.body.productId,
      userId: req.body.userId,
    });

    const savedList = await list.save();
    res.status(201).json(savedList);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding item",
      error: error.message,
    });
  }
});

// Delete MyList item
router.delete("/:id", async (req, res) => {
  try {
    const item = await MyList.findById(req.params.id);
    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found!" });
    }

    await MyList.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ success: true, message: "MyList item deleted successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
});

// Get single MyList item
router.get("/:id", async (req, res) => {
  try {
    const item = await MyList.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found." });
    }
    res.status(200).json(item);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
});

// Get MyList item count
router.get(`/count`, async (req, res) => {
  try {
    const count = await MyList.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching count",
      error: error.message,
    });
  }
});

module.exports = router;
