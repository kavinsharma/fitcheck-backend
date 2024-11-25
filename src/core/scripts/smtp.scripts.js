const nodemailer = require("nodemailer");
const config = require("../../config");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // Ensure correct host name
  port: 587, // Use appropriate port (usually 587 for TLS or 465 for SSL)
  secure: false, // Set true if using port 465
  auth: {
    user: config.STMP_EMAIL,
    pass: config.STMP_PASSWORD,
  },
});

module.exports = { transporter };
