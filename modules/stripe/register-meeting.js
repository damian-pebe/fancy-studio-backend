import express from "express";
import supabase from "../../db.js";

const insertRegister = express.Router();

insertRegister.post("/", async (req, res) => {
    try {
        const {
            phone,
            email,
            amount,
            currency,
            status,
            selected_day,
            selected_time
        } = req.body || {};

        const safeData = {
            phone: phone ?? '',
            email: email ?? '',
            amount: amount ? Number(amount) : 0,
            currency: currency ? currency.toUpperCase() : 'MXN',
            status: status ?? 'pending',
            selected_day: selected_day ?? '',
            selected_time: selected_time ?? ''
        };

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

export { insertRegister };