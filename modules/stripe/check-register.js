import express from "express";
import { BASE_URL } from "../../environment.js";

const checkRegister = express.Router();

checkRegister.post("/", async (req, res) => {
  try {
    const { amount, currency, status, phone, email } = req.body;

    const safeData = {
      amount: amount ?? 100,
      currency: currency ?? "MXN",
      status: status ?? "pending",
      phone: phone ?? "0000000000",
      email: email ?? "null@example.com",
    };

    const apiResponse = await fetch(
      `${BASE_URL}/get-register?email=${email}&phone=${phone}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const responseData = await apiResponse.json();

    if (!apiResponse.ok || !responseData.data) {
      console.log("No register found for:", email, phone);
      return res.status(404).json({
        success: false,
        message: "No register found",
      });
    }

    safeData.selected_day = responseData.data.selected_day;
    safeData.selected_time = responseData.data.selected_time;

    safeData.status = "done";

    const insertData = await fetch(`${BASE_URL}/book-meeting`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(safeData),
    });

    const insertDataResponse = await insertData.json();
    res.status(200).json({
      success: true,
      message: "Payment record inserted successfully",
      data: insertDataResponse.data[0],
    });
  } catch (error) {
    console.error("Unexpected error inserting payment:", error);
    res.status(500).json({
      success: false,
      message: "Unexpected error while inserting payment record",
    });
  }
});

export { checkRegister };
