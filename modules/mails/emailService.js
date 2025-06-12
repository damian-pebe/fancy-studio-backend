import * as dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (subject, text, to) => {

  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to || "damian.pebe@gmail.com",
      subject: subject || "Test Email",
      text: text || "Hello, this is an email from Fancy Bakend!",
    };

    const info = await transporter.sendMail(mailOptions);
    return info.response;
  } catch (error) {
    throw error;
  }
};

export default sendEmail;
