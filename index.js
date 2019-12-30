const winston = require('winston');
const express = require('express');
const barronList = require('./readFile/barron.js');
const ikWords = require('./models/ik');

const app = express();
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, enctype'
  );
  next();
});
// require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
// require('./startup/config')();
// require('./startup/validation')();

const port = process.env.PORT || 4000;

app.listen(port, () => winston.info(`Listening on port ${port}...`));
