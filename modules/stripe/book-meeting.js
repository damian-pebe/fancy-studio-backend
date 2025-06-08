import express from "express";
import supabase from "../../db.js";

const bookMeeting = express.Router();


bookMeeting.post("/", async (req, res) => {
  try {
    const result = await supabase`
      INSERT INTO checkout_payments (
        user_id, amount, currency, status, selected_day,
        selected_time, phone, email
      )
      VALUES (
        1, 100.00, 'USD', 'completed', '2023-10-01',
        '10:00', '1234567890', 'user@example.com'
      )
      RETURNING *;
    `;

    res.status(200).json({
      success: true,
      message: 'Payment record inserted',
      data: result
    });
  } catch (error) {
    console.error('Error inserting payment:', error);
    res.status(500).json({
      success: false,
      message: 'Error inserting payment record'
    });
  }
});

export { bookMeeting };
