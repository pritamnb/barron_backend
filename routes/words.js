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
  const words = await Words.find().select({
    word: 1,
    meaning: 1,
    bookmarked: 1
  });
  console.log('**********', words.length);

  res.send(words);
});

router.post('/filter', async (req, res) => {
  console.log('filter payload', req.body['bookmark'] === 'All');
  const payload = req.body;

  // const list = ['a', 'b', 'z']; // dummy
  let words;
  let regEx = [];
  const list = payload.list;
  let order = payload.order;
  let bookmark = payload.bookmark;

  if (payload['list'][0] !== 'All') {
    console.log('if list does not contain ALL');

    for (let itr = 0; itr < list.length; itr++) {
      regEx[itr] = new RegExp('^' + list[itr], 'i');
    }
    console.log(regEx);

    // const words = await Words.findById(req.params.id);
    if (bookmark !== 'All') {
      words = await Words.find({
        word: { $in: regEx },
        bookmarked: bookmark
      })
        .sort({ word: order })
        .select(['word', 'meaning', 'bookmarked']);
    } else if (bookmark === 'All') {
      words = await Words.find({
        word: { $in: regEx }
      })
        .sort({ word: order })
        .select(['word', 'meaning', 'bookmarked']);
    }

    console.log('searched words', words);
  } else if (payload['list'][0] === 'All') {
    console.log('if list contain ALL');
    if (bookmark !== 'All') {
      words = await Words.find({ bookmarked: bookmark })
        .sort({ word: order })
        .select(['word', 'meaning', 'bookmarked']);
    } else if (bookmark === 'All') {
      words = await Words.find()
        .sort({ word: order })
        .select(['word', 'meaning', 'bookmarked']);
    }

    console.log('searched words All', words.length);
  }
  if (!words)
    return res.status(404).send('The words with the given ID was not found.');

  res.send(words);
});

router.put('/bookmark/:id', async (req, res) => {
  console.log(req.params);
  console.log(req.body);

  const word = await Words.findByIdAndUpdate(
    req.params.id,
    {
      bookmarked: req.body.state
    },
    {
      new: true
    }
  );
  if (!word)
    return res
      .status(404)
      .send('The word with the given id could not be found');
  res.send(word);
});

router.post('/searchWord', async (req, res) => {
  console.log(req.body['searchQuery']);
  let words;
  let regEx;
  regEx = new RegExp('^' + req.body['searchQuery'], 'i');

  words = await Words.find({
    word: { $in: regEx }
  }).select(['word', 'meaning', 'bookmarked']);
  console.log('searched by starting', words);
  if (!words) {
    res.status(404).send('Words with the given string could not be found...');
  }
  res.send(words);
});

module.exports = router;
