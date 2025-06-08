import express from "express";
import Stripe from "stripe";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

const webhook = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-04-10",
});
import { BASE_URL } from "../../environment.js";


webhook.post(
  "/",
  bodyParser.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      console.error("Webhook signature verification failed:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const phone = session.customer_details?.phone || null;
      const email = session.customer_details?.email;

      try {
        console.log("Sending data to API:", {
          amount: session.amount_total / 100,
          currency: session.currency,
          status: "completed",
          phone,
          email,
        });
        await fetch(`${BASE_URL}/book-meeting`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: session.amount_total / 100,
            currency: session.currency,
            status: "completed",
            phone,
            email,
          }),
        });
      } catch (error) {
        console.error("Error sending data to API:", error);
      }
    }

    res.status(200).json({ received: true });
  }
);

export { webhook };
