const devLogger = require('./devLogger');
const productionLogger = require('./prodLogger');

let logger = null;

if (process.env.NODE_ENV === 'production') {
  logger = productionLogger();
}

if (process.env.NODE_ENV === 'dev') {
  logger = devLogger();
}

module.exports = logger;
