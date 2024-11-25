const { transporter } = require("../../core/scripts/smtp.scripts");

const emailSender = async email => {
  try {
    AWS.config.update(config.get("AWS_SES"));
    const ses = new AWS.SES();
    const params = {
      Destinations: email.addresses, // Use Destinations instead of ToAddresses
      RawMessage: {
        Data:
          `From: ${process.env.AWS_SENDERS_EMAIL}\n` +
          `To: ${email.addresses.join(",")}\n` +
          `Subject: ${email.subject}\n` +
          "MIME-Version: 1.0\n" +
          'Content-type: multipart/mixed; boundary="NextPart"\n\n' +
          "--NextPart\n" +
          "Content-Type: text/html; charset=UTF-8\n\n" +
          `${email.body}\n\n`,
      },
    };

    const sendEmail = await ses.sendRawEmail(params).promise();
    console.log(
      "🚀 ~ file: sendEmail.js:31 ~ exports.emailSender= ~ sendEmail:",
      sendEmail,
    );
    return sendEmail;
  } catch (err) {
    console.log("error occured in email sender", err);
  }
};

/**
 * Sends an email with the given options
 * @param {Object} mailOptions - The email options
 * @returns {Promise} Resolves with the response info or rejects with an error
 */
const sendEmail = async mailOptions => {
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = { emailSender, sendEmail };
