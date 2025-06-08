import express from "express";
import supabase from "../../db.js";

const registerMeeting = express.Router();

registerMeeting.post("/", async (req, res) => {
    try {
        const {
            phone,
            email,
            amount,
            currency = 'USD',
            status = 'pending',
            selected_day = '',
            selected_time = '',
            user_id = null
        } = req.body || {};

        // Prepare safe data object
        const safeData = {
            phone: phone || '',
            email: email || '',
            amount: Number(amount),
            currency: currency.toUpperCase(),
            status,
            selected_day,
            selected_time,
            user_id
        };

        // Insert into database
        const result = await supabase`
            INSERT INTO schedule_meetings (
                user_id, amount, currency, status, selected_day,
                selected_time, phone, email
            )
            VALUES (
                ${safeData.user_id}, ${safeData.amount}, ${safeData.currency}, 
                ${safeData.status}, ${safeData.selected_day},
                ${safeData.selected_time}, ${safeData.phone}, ${safeData.email}
            )
            RETURNING *
        `;

        res.json({
            success: true,
            data: result[0],
            message: 'Meeting registered successfully'
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
            message: 'Failed to register meeting'
        });
    }
});

export default registerMeeting;