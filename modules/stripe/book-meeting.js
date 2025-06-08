import express from "express";
import supabase from "../../db.js";

const bookMeeting = express.Router();


bookMeeting.post("/", async (req, res) => {
  try {
    const {
      user_id,
      amount,
      currency,
      status,
      selected_day,
      selected_time,
      phone,
      email
    } = req.body;

    const safeData = {
      user_id: user_id ?? 1,
      amount: amount ?? 100.00,
      currency: currency ?? 'MXN',
      status: status ?? 'pending',
      selected_day: selected_day ?? new Date().toISOString().split('T')[0],
      selected_time: selected_time ?? new Date().toISOString(),
      phone: phone ?? '0000000000',
      email: email ?? 'null@example.com',
    };

    const result = await supabase`
      INSERT INTO schedule_meetings (
      user_id, amount, currency, status, selected_day,
      selected_time, phone, email
      )
      VALUES (
      ${safeData.user_id}, ${safeData.amount}, ${safeData.currency}, ${safeData.status}, ${safeData.selected_day},
      ${safeData.selected_time}, ${safeData.phone}, ${safeData.email}
      )
      RETURNING *;
    `;

    console.log('Payment record inserted:', result);
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
