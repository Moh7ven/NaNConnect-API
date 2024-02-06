import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const myEmail = "nanconnect225@gmail.com";

// Configuration du transporteur (SMTP)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  service: "gmail",
  auth: {
    user: myEmail,
    pass: process.env.EMAIL_PASSWORD_SECRET,
  },
});

// Exemple d'envoi d'e-mail lors de l'inscription

export const welcomeEmail = (toEmail) => {
  const mailOptions = {
    from: myEmail,
    to: toEmail,
    subject: "Bienvenue sur NaNConnect",
    html: '<h2 style="color: green">Merci de vous être inscrit sur NaNConnect. Nous sommes ravis de vous avoir parmi nous!</h2>',
  };

  return transporter.sendMail(mailOptions);
};

export const codeEmail = (toEmail, code) => {
  const mailOptions = {
    from: myEmail,
    to: toEmail,
    subject: "Code de validation",
    html: `
    <h2">Votre code de validation est : <span style="color: #fcbe24; font-weight: bold; font-size: 1.5em">${code}</span></h2>
    
    `,
  };

  return transporter.sendMail(mailOptions);
};
