const mongoose = require('mongoose');
const Joi = require('joi');
let wordLen = 0;
let stringifyWords;
const barronList = require('../readFile/barron');

// schema
const barronSchema = new mongoose.Schema({
  word: {
    type: String,
    required: true
  },
  meaning: {
    type: String,
    required: true
  },
  ik: {
    type: Number,
    required: true
  },
  idk: {
    type: Number,
    required: true
  },
  bookmarked: {
    type: Boolean,
    required: true
  }
});
const Words = mongoose.model('Words', barronSchema);
async function getEntries() {
  const words = await Words.find();
  wordLen = words.length;
  console.log('entries from db-----', wordLen);
  // pushWords();
}

barronList('./readFile/barrons_333.json', (err, words) => {
  if (err) {
    console.log(err);
    return;
  }
  stringifyWords = words;
  // stringifyWords = JSON.stringify(words, null, 2);
  wordLen = stringifyWords.length;
  console.log('stringified length-----', wordLen);
  // pushWords();
});
async function pushWords() {
  let barron = [];
  let words = {};
  let ikCount = 0;
  let idkCount = 0;
  let bookmarked = false;
  for (let i = 0; i < wordLen; i++) {
    barron.push(stringifyWords[i]);
  }
  barron.forEach(async w => {
    words = new Words({
      word: w['WORD'],
      meaning: w['MEANING'],
      ik: ikCount,
      idk: idkCount,
      bookmarked: bookmarked
    });
    words = await words.save();
    console.log(words);
  });
}
getEntries();
// pushWords();

function validateWord(word) {
  const schema = {
    word: Joi.string().required(),
    meaning: Joi.string().required()
  };

  return Joi.validate(word, schema);
}

exports.Words = Words;
exports.barronSchema = barronSchema;
exports.validate = validateWord;
