const Joi = require('joi');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const asyncMiddleware = require('../middleware/async');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { Words, barronSchema, validate } = require('../models/words');
// code
router.get('/', async (req, res) => {
  // throw new Error('Could not get the genres');
  const words = await Words.find().select({ word: 1, meaning: 1 });
  // console.log('**********', words.length);

  res.send(words);
});

router.get('/a', async (req, res) => {
  // const list = ['A', 'B', 'Z'];
  const list = ['a', 'b', 'z'];

  let regEx = [];
  let words;
  for (let itr = 0; itr < list.length; itr++) {
    regEx[itr] = new RegExp('^' + list[itr], 'i');
  }
  console.log(regEx);

  // const words = await Words.findById(req.params.id);

  words = await Words.find({
    word: { $in: regEx }
  });
  // console.log('searched words', words);
  // }
  if (!words)
    return res.status(404).send('The words with the given ID was not found.');

  res.send(words);
});

module.exports = router;
