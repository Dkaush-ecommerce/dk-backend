const sendEmail = async ({ email, subject, message }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Email sent to ${email}`);
      console.log(`Subject: ${subject}`);
      console.log(`Message ${message}`);
      resolve();
    }, 4000);
  });
};

module.exports = { sendEmail };
