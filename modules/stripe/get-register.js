import express from "express";
import supabase from "../../db.js";

const getRegister = express.Router();

getRegister.get("/", async (req, res) => {
  try {
    const { phone, email } = req.body;

    const result = await supabase`
      SELECT selected_day, selected_time FROM register
      WHERE email = ${email} AND phone = ${phone}
      LIMIT 1;
    `;

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Register not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Register found",
      data: result[0],
    });
  } catch (error) {
    console.error("Error fetching register:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching register",
    });
  }
});

export { getRegister };
