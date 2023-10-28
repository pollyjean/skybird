import nodemailer from "nodemailer";

const smtpTransporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_ID,
    pass: process.env.MAIL_PW,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export default smtpTransporter;
