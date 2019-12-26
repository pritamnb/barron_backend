const mongoose = require('mongoose');
const Joi = require('joi');
const { barronSchema, Words } = require('./words');

const IdkWordsSchema = new mongoose.Schema({
  word: {
    type: barronSchema,
    required: true
  },
  count: {
    type: Number,
    require: true
  }
});
const IdkWords = mongoose.model('IdkWords', IdkWordsSchema);
// dummy entry
async function addIdkWords(wordId) {
  console.log(wordId);

  const searchWord = await Words.findById(wordId);
  console.log('searched word from the list::', searchWord);

  if (!searchWord) return console.log('Invalid word id');
  let IdkWord = new IdkWords({
    word: {
      _id: wordId,
      word: searchWord['word'],
      meaning: searchWord['meaning']
    },
    count: 1
  });
  IdkWord = await IdkWord.save();
  console.log(IdkWord);
}
// addIdkWords('5df27c826362540f2419c592');
// end of dummy entry
function validateWord(word) {
  const schema = {
    genreId: Joi.ObjectId().required(),
    count: Joi.number().required()
  };

  return Joi.validate(word, schema);
}

exports.IdkWords = IdkWords;
exports.IdkWordsSchema = IdkWordsSchema;
exports.validateWord = validateWord;
