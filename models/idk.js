const mongoose = require('mongoose');
const Joi = require('joi');
const { barronSchema } = require('./words');

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

function validateWord(word) {
  const schema = {
    genreId: Joi.ObjectId().required(),
    count: Joi.number().required()
  };

  return Joi.validate(word, schema);
}

exports.IdkWords = IdkWords;
exports.IdkWordsSchema = IdkWordsSchema;
exports.validate = validateWord;
