const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const pLimit = require("p-limit");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post("/", async (req, res) => {
  const products = req.body.products;

  // const countryList=[];

  // req.body.country?.map((item)=>{
  //   countryList.push(item.country);
  // })

  const lineItems = products.map((product) => ({
    price_data: {
      currency: "USD",
      product_data: {
        name: product.productTitle?.substr(0, 30) + "...",
        images: [product.images],
      },
      unit_amount: product.price * 100,
    },
    quantity: product.quantity,
  }));
  const customer = await stripe.customers.create({
    metadata: {
      userId: req.body.userId,
      cart: JSON.stringify(lineItems),
    },
  });
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    phone_number_collection: {
      enabled: true,
    },
    customer: customer.id,
    line_items: lineItems,
    mode: "payment",
    shipping_address_collection: {
      allowed_countries: ["US", "LK"],
    },
    success_url: `${process.env.CLIENT_BASE_URL}/payment/complete`,
    cancel_url: `${process.env.CLIENT_BASE_URL}/cancel`,
  });

  res.json({ id: session.id });
});

router.get("/payment/complete", async (req, res) => {
  try {
    const sessionId = req.query.session_id;
    if (!sessionId) {
      return res.status(400).json({ message: "Session ID is required." });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["payment_intent.payment_method"],
    });

    console.log("🔍 Retrieved Session Details:", session); // Log full session details

    if (session.payment_intent) {
      const paymentIntent = await stripe.paymentIntents.retrieve(
        session.payment_intent
      );
      console.log("💰 Payment Intent Details:", paymentIntent); // Log Payment Intent Details
    }

    if (session.payment_status === "paid") {
      return res.json({ message: "Payment Successful!" });
    } else {
      return res.json({ message: "Payment failed or pending." });
    }
  } catch (error) {
    console.error("❌ Error verifying payment:", error);
    res.status(500).json({ message: "Server error while verifying payment." });
  }
});

router.get("/cancel", (req, res) => {
  res.redirect("/");
});
module.exports = router;
