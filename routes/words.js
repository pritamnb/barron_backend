const Joi = require('joi');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const asyncMiddleware = require('../middleware/async');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { Words, barronSchema, validate } = require('../models/words');

router.get('/', async (req, res) => {
  // throw new Error('Could not get the genres');
  const words = await Words.find();
  // console.log('**********', words.length);

  res.send(words);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let words = new Words({ WORD: req.body.name });
  words = await words.save();
  res.send(words);
});

router.delete('/:id', async (req, res) => {
  const words = await Words.findByIdAndRemove(req.params.id);

  if (!words)
    return res.status(404).send('The words with the given ID was not found.');

  res.send(words);
});

router.get('/:id', async (req, res) => {
  const words = await Words.findById(req.params.id);

  if (!words)
    return res.status(404).send('The words with the given ID was not found.');

  res.send(words);
});

module.exports = router;
