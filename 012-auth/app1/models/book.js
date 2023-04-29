const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  id: { type: String },
  title: { type: String, required: true },
  description: { type: String },
  authors: { type: String },
  favorite: { type: String },
  fileCover: { type: String },
  fileName: { type: String }
});

const book = mongoose.model('bookSchema', bookSchema);

module.exports = book;