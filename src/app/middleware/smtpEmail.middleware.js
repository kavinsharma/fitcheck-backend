const config = require("../../config");
const { sendEmail } = require("./sendEmail.middleware");

/**
 * Middleware to send emails
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const emailMiddleware = async (req, res, next) => {
  const { to, subject, text, html } = req.email;
  console.log(
    "🚀 ~ emailMiddleware ~ to, subject, text, html:",
    to,
    subject,
    text,
    html,
  );

  if (!to || !subject || !text) {
    return console.error({
      message: "Missing required email fields: to, subject, text",
    });
  }

  const mailOptions = {
    from: `"Fitcheck" <${config.STMP_EMAIL}>`,
    to,
    subject,
    text,
    html, // Optional HTML body
  };

  try {
    await sendEmail(mailOptions);
    // next(); // Continue to the next middleware or route
  } catch (error) {
    console.error({ message: "Failed to send email", error: error.message });
  }
};

module.exports = emailMiddleware;
