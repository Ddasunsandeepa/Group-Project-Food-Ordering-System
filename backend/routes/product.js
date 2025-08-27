const { Category } = require("../models/category.js");
const { Product } = require("../models/product.js");
const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const plimit = require("p-limit");

const limit = plimit(2);

// Helper function to upload images to Cloudinary
async function uploadImages(images) {
  try {
    const imageUploads = images.map((image) =>
      limit(() => cloudinary.uploader.upload(image))
    );
    const results = await Promise.all(imageUploads);
    return results.map((result) => result.secure_url);
  } catch (err) {
    console.error("Error uploading images:", err);
    throw new Error("Image upload failed.");
  }
}

// Get all products with populated category
router.get(`/`, async (req, res) => {
  const filterKey = req.query.product;
  console.log(filterKey);
  if (filterKey !== undefined) {
    const productList = await Product.find({ isFeatured: false });
    if (!productList) {
      res.status(500).json({ success: false });
    }
    return res.status(200).json({
      products: productList,
    });
  }
  let productList = [];
  if (req.query.catName !== undefined) {
    productList = await Product.find({ catName: req.query.catName });
  }
  try {
    const productList = await Product.find().populate("category");
    res.send(productList);
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to retrieve products." });
  }
});

//isfeatures finding

router.get(`/featured`, async (req, res) => {
  const productList = await Product.find({ isFeatured: true });
  if (!productList) {
    res.status(500).json({ success: false });
  }
  return res.status(200).json(productList);
});

// Get product by ID with populated category
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }
    res.status(200).send(product);
  } catch (err) {
    res.status(500).json({ message: "Error fetching product." });
  }
});

// Create a new product
router.post(`/create`, async (req, res) => {
  try {
    const category = await Category.findById(req.body.category);
    if (!category) return res.status(404).send("Invalid Category!");

    const imgurl = await uploadImages(req.body.images);
    if (!imgurl)
      return res.status(500).json({ message: "Image upload failed." });

    let product = new Product({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      catName: req.body.catName,
      type: req.body.type,
      price: req.body.price,
      oldPrice: req.body.oldPrice,
      isFeatured: req.body.isFeatured,
      countInStock: req.body.countInStock,
      discount: req.body.discount,
      size: req.body.size,
      rating: req.body.rating,
      images: imgurl,
      productSize: req.body.productSize,
    });

    product = await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: "Failed to create product." });
  }
});

// Delete product by ID
router.delete("/:id", async (req, res) => {
  try {
    const deleteProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deleteProduct) {
      return res.status(404).json({ message: "Product not found!" });
    }
    res.status(200).json({ message: "Product deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete product." });
  }
});

// Update product by ID
router.put("/:id", async (req, res) => {
  try {
    const imgurl = await uploadImages(req.body.images);
    if (!imgurl)
      return res.status(500).json({ message: "Image upload failed." });

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        catName: req.body.catName,
        type: req.body.type,
        price: req.body.price,
        oldPrice: req.body.oldPrice,
        isFeatured: req.body.isFeatured,
        countInStock: req.body.countInStock,
        discount: req.body.discount,
        size: req.body.size,
        rating: req.body.rating,
        images: imgurl,
        productSize: req.body.productSize,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product update failed." });
    }
    res.status(200).json({
      message: "Product updated successfully.",
      product: updatedProduct,
    });
  } catch (err) {
    res.status(500).json({ message: "Error updating product." });
  }
});

router.get("/api/products/count", async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments(); // MongoDB query
    res.json({ count: totalProducts });
  } catch (error) {
    console.error("Error fetching product count:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
