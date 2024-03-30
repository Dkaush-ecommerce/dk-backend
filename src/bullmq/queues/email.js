const { Queue } = require('bullmq');
const { EMAIL } = require('../../utils/constants/queues');
const connection = require('../../config/redis');

const emailQueue = new Queue(EMAIL, {
  connection,
});

module.exports = emailQueue;
