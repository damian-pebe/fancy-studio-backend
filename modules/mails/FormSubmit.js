import express from "express";
import sendEmail from "./emailService.js";

const formSubmit = express.Router();

formSubmit.post("/", async (req, res) => {
  const { date, time, phone, email } = req.query;

  if (!date || !time || !phone || !email) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const response = await sendEmail(date, time, phone, email);
    res.status(200).json({ message: "Email sent successfully", response });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to send email", details: error.message });
  }
});

export { formSubmit };
