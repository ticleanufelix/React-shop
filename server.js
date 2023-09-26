import express from "express";
import Stripe from "stripe";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const stripe = new Stripe(process.env.VITE_STRIPE_SECRET_KEY);
const app = express();
app.use(cors());
app.use(express.json());
app.post("/api/create-checkout-session", async (req, res) => {
  //linia asta de cod defineste endpoint-ul. Acest endpoint se apeleaza in Cart.jsx la linia 14
  try {
    const params = {
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      shipping_options: [
        { shipping_rate: "shr_1Nmg2DClEV48IMeXnyciKAXI" },
        { shipping_rate: "shr_1Nmg14ClEV48IMeXRhfTL3dC" },
      ],
      line_items: req.body.map((item) => {
        const img = item.image[0].asset._ref;
        const newImage = img
          .replace(
            "image-",
            "https://cdn.sanity.io/images/321x99ge/production/"
          )
          .replace("-webp", ".webp");
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
              images: [newImage],
            },
            unit_amount: item.price * 100,
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${req.headers.origin}/success`,
      cancel_url: `${req.headers.origin}/canceled`,
    };
    const session = await stripe.checkout.sessions.create(params);
    res.status(200).json(session);
  } catch (err) {
    res.status(err.statusCode || 500).json(err.message);
  }
});
app.listen(5500, () => console.log("Running..."));
