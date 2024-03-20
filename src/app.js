const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const { Worker } = require('bullmq');
const bodyParser = require('body-parser');
const envConfig = require('./config/env');
const routes = require('./routes');
const connectDB = require('./db/connectDb');
const { EMAIL } = require('./utils/constants/queues');
const { emailWorker } = require('./bullmq/workers/email');
const errorHandler = require('./errors/error');
const redisOptions = require('./config/redis');

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const worker = new Worker(EMAIL, emailWorker, {
  connection: redisOptions,
  limiter: { max: 300, duration: 1000 },
  attempts: 3,
  backoff: {
    type: 'exponential',
    delay: 1000,
  },
});

app.use('/api', routes);

app.use(errorHandler);

app.listen(envConfig.port, async () => {
  console.log(`Server is running on port ${envConfig.port}`);
  await connectDB(envConfig.mongoUri);
});
