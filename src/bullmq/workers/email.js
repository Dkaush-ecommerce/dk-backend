const { sendEmail } = require('../../services/emailService');

const emailWorker = async (job) => {
  await sendEmail(job.data);
};

module.exports = { emailWorker };
