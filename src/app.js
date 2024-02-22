const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const envConfig = require('./config/env');
const routes = require('./routes');

const app = express();
app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes);

app.listen(envConfig.port, () => {
  console.log(`Server is running on port ${envConfig.port}`);
});
