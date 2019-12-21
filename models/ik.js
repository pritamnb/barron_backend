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
  const word = await Words.findById(wordId);
  if (!word) return console.log('Invalid word id');
  const IkWord = new IkWords({
    word: {
      _id: wordId,
      word: word.name,
      meaning: word.meaning
    },
    count: 1
  });
}
addIkWords('5df27c826362540f2419c590');
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
exports.validate = validateWord;
