const express = require('express');
const words = require('../routes/words');
// const auth = require('../routes/auth');
const error = require('../middleware/error');
const ikWords = require('../models/ik');
module.exports = function(app) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/api/words', words);
  // app.use('/api/auth', auth);
  app.use(error); // passing reference
};
