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

module.exports = { emailSender };
