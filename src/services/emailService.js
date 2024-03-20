const sendEmail = async (email, subject, message) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Email sent to ${email}`);
      resolve();
    }, 1000);
  });
};

module.exports = { sendEmail };
