import express from "express";
import supabase from "../../db.js";

const registerMeeting = express.Router();

registerMeeting.post("/", async (req, res) => {
    try {
        const {
            phone,
            email,
            amount,
            currency,
            status,
        } = req.body || {};

        const safeData = {
            phone: phone ?? '',
            email: email ?? '',
            amount: amount ? Number(amount) : 0,
            currency: currency ? currency.toUpperCase() : 'USD',
            status: status ?? 'pending'
        };

        const result = await supabase`
            INSERT INTO register (
                phone, email, amount, currency, status
            )
            VALUES (
                ${safeData.phone}, ${safeData.email}, ${safeData.amount}, 
                ${safeData.currency}, ${safeData.status}
            )
            RETURNING *
        `;

        res.json({
            success: true,
            data: result[0],
            message: 'Registration successful'
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
            message: 'Failed to register'
        });
    }
});

export default registerMeeting;
