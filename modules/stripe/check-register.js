import express from "express";

const checkRegister = express.Router();

checkRegister.post("/", async (req, res) => {
  try {
    const { amount, currency, status, phone, email } = req.body;

    const safeData = {
      amount: amount ?? 100.0,
      currency: currency ?? "MXN",
      status: status ?? "pending",
      phone: phone ?? "0000000000",
      email: email ?? "null@example.com",
    };

    const apiResponse = await fetch("myapi", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone: safeData.phone, email: safeData.email }),
    });

    const { selected_day, selected_time } = await apiResponse.json();
    safeData.selected_day = selected_day;
    safeData.selected_time = selected_time;

    res.status(200).json({
      success: true,
      message: "Payment record inserted",
      data: safeData,
    });
  } catch (error) {
    console.error("Error inserting payment:", error);
    res.status(500).json({
      success: false,
      message: "Error inserting payment record",
    });
  }
});

export { checkRegister };
