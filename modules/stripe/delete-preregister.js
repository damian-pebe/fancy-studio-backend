import express from "express";
import supabase from "../../db.js";

const deleteRegister = express.Router();

deleteRegister.post("/", async (req, res) => {
    try {
        const {
            phone,
            email
        } = req.body || {};

        if (!phone || !email ) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields",
            });
        }

        const result = await supabase`
            DELETE FROM register 
            WHERE phone = ${phone}
            AND email = ${email}
           
            RETURNING *
        `;

        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No matching registration found",
            });
        }

        console.log("Deleted from register, data:", result[0]);
        res.json({
            success: true,
            data: result[0],
            message: "Registration deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
            message: "Failed to delete registration",
        });
    }
});

export { deleteRegister };
