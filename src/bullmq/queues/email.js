const { Queue } = require('bullmq');
const { EMAIL } = require('../../utils/constants/queues');
const redisOptions = require('../../config/redis');

const emailQueue = new Queue(EMAIL, {
  connection: redisOptions,
});

module.exports = emailQueue;
