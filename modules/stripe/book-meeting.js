import express from "express";
import supabase from "../../db.js";

const bookMeeting = express.Router();

bookMeeting.post("/", async (req, res) => {
  try {
    const { amount, currency, status, phone, email, selected_day, selected_time } = req.body;

    const safeData = {
      amount: amount,
      currency: currency ,
      status: status ,
      phone: phone,
      email: email,
      selected_day: selected_day,
      selected_time: selected_time
    };

    const result = await supabase`
      INSERT INTO schedule_meetings (
      amount, currency, status, selected_day,
      selected_time, phone, email
      )
      VALUES (
      ${safeData.amount}, ${safeData.currency}, ${safeData.status}, ${safeData.selected_day},
      ${safeData.selected_time}, ${safeData.phone}, ${safeData.email}
      )
      RETURNING *;
    `;

    res.status(200).json({
      success: true,
      message: "Payment record inserted",
      data: result,
    });
  } catch (error) {
    console.error("Error inserting payment:", error);
    res.status(500).json({
      success: false,
      message: "Error inserting payment record",
    });
  }
});

export { bookMeeting };
