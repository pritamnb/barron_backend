const mongoose = require('mongoose');
const Joi = require('joi');
const { barronSchema, Words } = require('./words');

const BookmarkSchema = new mongoose.Schema({
  word: {
    type: barronSchema,
    required: true
  },
  bookmarked: {
    type: Boolean,
    required: true
  }
});
const Bookmarks = mongoose.model('Bookmarks', BookmarkSchema);
// adding dummy entry
async function addBookmarkEntry(wordId) {
  const searchWord = await Words.findById(wordId);
  if (!searchWord) return console.log('Unable to locate the word details');
  let bookmarkWords = new Bookmarks({
    word: {
      _id: wordId,
      word: searchWord['word'],
      meaning: searchWord['meaning']
    },
    bookmarked: true
  });
  bookmarkWords = await bookmarkWords.save();
  console.log('bookmarked result on save', bookmarkWords);
}
// addBookmarkEntry('5df27c826362540f2419c595');
// validation
function validateBookmarkeWord(word) {
  const schema = {
    genreId: Joi.ObjectId().required(),
    bookmarked: Joi.boolean().required()
  };
  return Joi.validate(word, schema);
}

exports.BookmarkSchema = BookmarkSchema;
exports.Bookmarks = Bookmarks;
exports.validate = validateBookmarkeWord;
