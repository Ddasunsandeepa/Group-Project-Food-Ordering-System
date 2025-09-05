const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");
const authJwt = require("./helper/jwt.js");

app.use(cors());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
  })
);
app.options("*", cors());
app.use(express.json());

//middleware
app.use(bodyParser.json());
app.use(express.json());
// app.use(authJwt());

//Routes
const userRoutes = require("./routes/user.js");
const adminUserRoutes = require("./routes/adminUser.js");
const categoryRoutes = require("./routes/categories");
const orders = require("./routes/orders.js");
const productRoutes = require("./routes/product");
const cart = require("./routes/cart.js");
const productReviews = require("./routes/productReview.js");
const myList = require("./routes/myList.js");
const checkout = require("./routes/checkout.js");

app.use(`/uploads`, express.static("uploads"));
app.use(`/api/category`, categoryRoutes);
app.use(`/api/products`, productRoutes);
app.use(`/api/user`, userRoutes);
app.use(`/api/admin`, adminUserRoutes);
app.use(`/api/cart`, cart);
app.use(`/api/productReviews`, productReviews);
app.use(`/api/myList`, myList);
app.use(`/api/checkout`, checkout);
app.use(`/api/orders`, orders);

// Connect to MongoDB
mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully");
    //server
    app.listen(process.env.PORT, () => {
      console.log(`server is running http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
  });
