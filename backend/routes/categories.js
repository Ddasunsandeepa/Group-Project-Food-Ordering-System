const { Category } = require("../models/category");
const express = require("express");
const pLimit = require("p-limit");
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const plimit = require("p-limit");

cloudinary.config({
  cloud_name: process.env.clodinary_Config_Clod_Name,
  api_key: process.env.clodinary_Config_api_key,
  api_secret: process.env.clodinary_Config_api_secret,
});

//get all list

router.get("/", async (req, res) => {
  try {
    const categoryList = await Category.find();
    if (!categoryList) {
      res.status(500).json({ success: false });
    } else {
      res.send(categoryList);
    }
  } catch (error) {
    res.status(500).json({ success: false });
  }
});

//get by id

router.get("/:id", async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    res
      .status(500)
      .json({ message: "The category with the given ID was not found" });
  }

  return res.status(200).send(category);
});

//create category

router.post("/create", async (req, res) => {
  try {
    const limit = plimit(2); // Limit concurrent uploads to 2

    // Validate required fields
    const { name, description, images, color } = req.body;
    if (
      !name ||
      !description ||
      !images ||
      !Array.isArray(images) ||
      images.length === 0 ||
      !color
    ) {
      return res.status(400).json({
        error: "All fields are required (name, images, color)",
        success: false,
      });
    }

    // Upload images to Cloudinary
    const imagesToUpload = images.map((image) =>
      limit(async () => {
        const result = await cloudinary.uploader.upload(image);
        return result;
      })
    );

    const uploadStatus = await Promise.allSettled(imagesToUpload);

    // Extract secure URLs or handle failed uploads
    const imgurl = [];
    const uploadErrors = [];
    uploadStatus.forEach((status, index) => {
      if (status.status === "fulfilled") {
        imgurl.push(status.value.secure_url);
      } else {
        uploadErrors.push({ index, reason: status.reason.message });
      }
    });

    if (imgurl.length === 0) {
      return res.status(500).json({
        error: "No images could be uploaded",
        success: false,
        uploadErrors,
      });
    }

    // Create new category
    let category = new Category({
      name,
      description,
      images: imgurl,
      color,
    });

    category = await category.save();
    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: category,
      uploadErrors: uploadErrors.length > 0 ? uploadErrors : undefined, // Include errors if any
    });
  } catch (err) {
    console.error("Error while creating category:", err);
    return res.status(500).json({
      error: "Internal server error",
      success: false,
    });
  }
});

router.delete("/:id", async (req, res) => {
  const deletedUser = await Category.findByIdAndDelete(req.params.id);

  if (!deletedUser) {
    res.status(404).json({
      message: "Category not found!",
      success: false,
    });
  } else {
    res.status(200).json({
      success: true,
      message: "Category deleted!",
    });
  }
});

router.put("/:id", async (req, res) => {
  const limit = pLimit(2);
  const imagesToUpload = req.body.images.map((image) => {
    return limit(async () => {
      const result = await cloudinary.uploader.upload(image);

      return result;
    });
  });

  const uploadStatus = await Promise.all(imagesToUpload);

  const imgurl = uploadStatus.map((item) => {
    return item.secure_url;
  });
  if (!uploadStatus) {
    return res.status(500).json({
      error: "images cannot ipload!",
      status: false,
    });
  }
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      icon: imgurl,
      color: req.body.color,
    },
    {
      new: true,
    }
  );
  if (!category) {
    return res.status(500).json({
      message: "category cannot be updated!",
      success: false,
    });
  }
  res.send(category);
});
module.exports = router;
