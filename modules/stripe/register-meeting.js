import express from "express";
import supabase from "../../db.js";

const insertRegister = express.Router();
import { BASE_URL } from "../../environment.js";

insertRegister.post("/", async (req, res) => {
  try {
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
      amount: amount ? Number(amount) : 0,
      currency: currency ? currency.toUpperCase() : "MXN",
      status: status ?? "pending",
      selected_day: selected_day ?? "",
      selected_time: selected_time ?? "",
    };

    // register already done, check here
    const apiResponse = await fetch(
      `${BASE_URL}/get-register?email=${safeData.email}&phone=${safeData.phone}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const responseData = await apiResponse.json();

    if (!apiResponse.ok || !responseData.data) {
      console.log(
        "No register found for:",
        email,
        phone + "\nContinue with insert"
      );
    } else {
      // delete endpoint
      console.log("Register found to delete:", responseData.data);
      await fetch(
        `${BASE_URL}/delete-register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: safeData.email,
            phone: safeData.phone,
          })
        }
      );
    }

    const result = await supabase`
            INSERT INTO register (
                phone, email, amount, currency, status, 
                selected_day, selected_time
            )
            VALUES (
                ${safeData.phone}, ${safeData.email}, ${safeData.amount}, 
                ${safeData.currency}, ${safeData.status},
                ${safeData.selected_day}, ${safeData.selected_time}
            )
            RETURNING *
        `;
    console.log("Inserted Into register, data:", JSON.stringify(result[0], null, 2));
    res.json({
      success: true,
      data: result[0],
      message: "Registration successful",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Failed to register",
    });
  }
});

export { insertRegister };
