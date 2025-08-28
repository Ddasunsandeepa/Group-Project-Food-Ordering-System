// routes/admin.js
const { AdminUser } = require("../models/adminUser");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Allowed permissions
const ALLOWED_PERMISSIONS = ["view", "write", "super"];

// Middleware to verify admin token
const verifyAdminToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ status: false, msg: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.ADMIN_JWT_SECRET_KEY);
    const admin = await AdminUser.findById(decoded.id).select("-password");
    if (!admin) {
      return res.status(401).json({ status: false, msg: "Admin not found" });
    }
    req.admin = admin;
    next();
  } catch (error) {
    return res
      .status(403)
      .json({ status: false, msg: "Invalid or expired token" });
  }
};

// Admin signup
router.post("/signup", async (req, res) => {
  const { name, email, password, permissions = [], isSuper = false } = req.body;

  try {
    const existingAdmin = await AdminUser.findOne({ email });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ status: false, msg: "Admin already exists!" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const filteredPermissions = permissions.filter(p =>
      ALLOWED_PERMISSIONS.includes(p)
    );

    const newAdmin = await AdminUser.create({
      name,
      email,
      password: hashPassword,
      permissions: filteredPermissions,
      isSuper,
    });

    const token = jwt.sign(
      { email: newAdmin.email, id: newAdmin._id, isSuper: newAdmin.isSuper },
      process.env.ADMIN_JWT_SECRET_KEY,
      { expiresIn: "1m" } // 30 min session
    );

    res.status(201).json({
      status: true,
      admin: {
        id: newAdmin._id,
        name: newAdmin.name,
        email: newAdmin.email,
        permissions: newAdmin.permissions,
        isSuper: newAdmin.isSuper,
      },
      token,
    });
  } catch (error) {
    console.error("Admin Signup Error:", error);
    res.status(500).json({ status: false, msg: "Something went wrong" });
  }
});

// Admin signin
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingAdmin = await AdminUser.findOne({ email });
    if (!existingAdmin) {
      return res.status(404).json({ status: false, msg: "Admin not found!" });
    }

    const matchPassword = await bcrypt.compare(password, existingAdmin.password);
    if (!matchPassword) {
      return res
        .status(400)
        .json({ status: false, msg: "Invalid credentials" });
    }

    const token = jwt.sign(
      { email: existingAdmin.email, id: existingAdmin._id, isSuper: existingAdmin.isSuper },
      process.env.ADMIN_JWT_SECRET_KEY,
      { expiresIn: "30m" } // 30 minutes
    );

    res.status(200).json({
      status: true,
      admin: {
        id: existingAdmin._id,
        name: existingAdmin.name,
        email: existingAdmin.email,
        permissions: existingAdmin.permissions,
        isSuper: existingAdmin.isSuper,
      },
      token,
      msg: "Admin authenticated",
    });
  } catch (error) {
    console.error("🔥 Admin Signin Error:", error);
    res.status(500).json({ status: false, msg: "Something went wrong" });
  }
});

// Protected: Get single admin by ID
router.get("/:id", async (req, res) => {
  try {
    const admin = await AdminUser.findById(req.params.id).select("-password");
    if (!admin) {
      return res.status(404).json({ status: false, msg: "Admin not found" });
    }
    res.status(200).json(admin);
  } catch (error) {
    console.error("Get Admin Error:", error);
    res.status(500).json({ status: false, msg: "Failed to fetch admin" });
  }
});


// Protected: Get all admins
router.get("/", async (req, res) => {
  try {
    const admins = await AdminUser.find().select("-password");
    res.status(200).json({ status: true, admins });
  } catch (error) {
    res.status(500).json({ status: false, msg: "Failed to fetch admins" });
  }
});

// Protected: Delete admin
router.delete("/:id", verifyAdminToken, async (req, res) => {
  try {
    const admin = await AdminUser.findByIdAndDelete(req.params.id);
    if (!admin) {
      return res.status(404).json({ status: false, msg: "Admin not found" });
    }
    res.status(200).json({ status: true, msg: "Admin deleted" });
  } catch (error) {
    res.status(500).json({ status: false, msg: "Something went wrong" });
  }
});

// Protected: Update admin
router.put("/:id", async (req, res) => {
  const { name, email, password, permissions, isSuper } = req.body;

  try {
    const updateData = { name, email, permissions, isSuper };

    if (permissions) {
      updateData.permissions = permissions.filter(p =>
        ALLOWED_PERMISSIONS.includes(p)
      );
    }

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedAdmin = await AdminUser.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).select("-password");

    if (!updatedAdmin) {
      return res.status(404).json({ status: false, msg: "Admin not found" });
    }

    res.status(200).json({ status: true, admin: updatedAdmin });
  } catch (error) {
    res.status(500).json({ status: false, msg: "Update failed" });
  }
});

module.exports = router;
