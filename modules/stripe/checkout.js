import express from "express";

import dotenv from "dotenv";
dotenv.config();

import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-04-10',
});
import { bookMeeting, BASE_URL } from "../../environment.js";
const checkoutSession = express.Router();

checkoutSession.post("/", async (req, res) => {
  const {
    phone,
    email,
    amount,
    currency,
    status,
    selected_day,
    selected_time,
  } = req.body || {};

  const safeData = {
    phone: phone ?? "",
    email: email ?? "",
    amount: amount ?? 100,
    currency: currency ?? "MXN",
    status: status ?? "pending",
    selected_day: selected_day ?? "",
    selected_time: selected_time ?? "",
  };
  try {
    await fetch(`${BASE_URL}/register-meeting`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(safeData),
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: safeData.currency,
            product_data: {
              name: "Agendar Cita en Fancy Microblading",
              description:
                "Reserva tu cita para un servicio de microblading profesional.\n Esta cita es no reembolsable.\nAl reservar tu espacio, bloqueamos ese horario exclusivamente para ti, rechazando otras posibles citas.",
              images: [bookMeeting],
            },
            unit_amount: safeData.amount * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_creation: "always",
      phone_number_collection: {
        enabled: true,
      },
      success_url: `${BASE_URL}/success`,
      cancel_url: `${BASE_URL}/agendar`,
    });

    

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Error al crear la sesión de checkout:", error);
    res.status(500).send("Error al crear la sesión de checkout");
  }
});

export { checkoutSession };
