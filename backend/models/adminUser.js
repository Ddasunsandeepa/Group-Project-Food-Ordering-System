const mongoose = require("mongoose");

const adminUserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    permissions: {
      type: [String],
      enum: ["view", "write", "super"], 
      default: ["view"],        
    },
    isSuper: {
      type: Boolean, // true = super admin (full access)
      default: false,
    },
    active: {
      type: Boolean, // allow disabling an admin account
      default: true,
    },
  },
  { timestamps: true }
);

// Add virtual id field
adminUserSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

adminUserSchema.set("toJSON", {
  virtuals: true,
});

exports.AdminUser = mongoose.model("AdminUser", adminUserSchema);
exports.adminUserSchema = adminUserSchema;
