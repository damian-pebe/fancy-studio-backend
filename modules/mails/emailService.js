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

const sendEmail = async (date, time, phone, email) => {
  try {
    const messageHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 0;">
      <h2>Hola, ${email}</h2>
      
      <p>Tu cita ha sido reservada para:</p>
      <ul>
        <li><strong>Fecha:</strong> ${date}</li>
        <li><strong>Hora:</strong> ${time}</li>
      </ul>

      <p>Tus detalles:</p>
      <ul>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Teléfono:</strong> ${phone}</li>
      </ul>

      <p>Si necesitas cambiar tu cita, contáctanos vía 
        <a href="https://wa.me/3317762770">WhatsApp</a></p>

      <p>Por favor incluye tu nombre, email, teléfono y la fecha/hora actual de tu cita cuando nos envíes mensaje.</p>

      <p><em>¡Gracias por reservar con Fancy Studio!</em></p>
      </div>
    `;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email || "damian.pebe@gmail.com",
      subject: "Fancy Studio - Confirmación de tu Cita",
      html: messageHtml,
    };

    const info = await transporter.sendMail(mailOptions);
    return info.response;
  } catch (error) {
    throw error;
  }
};

export default sendEmail;
