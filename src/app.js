const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const envConfig = require('./config/env');
const routes = require('./routes');
const connectDB = require('./db/connectDb');
const errorHandler = require('./errors/error');

const app = express();
app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes);

app.use(errorHandler);

app.listen(envConfig.port, async () => {
  console.log(`Server is running on port ${envConfig.port}`);
  await connectDB(envConfig.mongoUri);
});
