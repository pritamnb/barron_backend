const winston = require('winston');
const express = require('express');
const barronList = require('./readFile/barron.js');
const ikWords = require('./models/ik');

const app = express();
// require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
// require('./startup/config')();
// require('./startup/validation')();

const port = process.env.PORT || 4000;

app.listen(port, () => winston.info(`Listening on port ${port}...`));
