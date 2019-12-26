const mongoose = require('mongoose');
const Joi = require('joi');
const { Words, barronSchema } = require('./words');
const IkWordsSchema = new mongoose.Schema({
  word: {
    type: barronSchema,
    required: true
  },
  count: {
    type: Number,
    require: true,
    min: 0
  }
});
const IkWords = mongoose.model('IkWords', IkWordsSchema);
async function addIkWords(wordId) {
  console.log(wordId);

  const searchWord = await Words.findById(wordId);
  console.log('searched word from the list::', searchWord);

  if (!searchWord) return console.log('Invalid word id');
  let IkWord = new IkWords({
    word: {
      _id: wordId,
      word: searchWord['word'],
      meaning: searchWord['meaning']
    },
    count: 1
  });
  IkWord = await IkWord.save();
  console.log(IkWord);
}
// addIkWords('5df27c826362540f2419c591');
function validateWord(word) {
  const schema = {
    genreId: Joi.ObjectId().required(),
    count: Joi.number()
      .min(0)
      .required()
  };

  return Joi.validate(word, schema);
}

exports.IkWords = IkWords;
exports.IkWordsSchema = IkWordsSchema;
exports.validateWord = validateWord;
