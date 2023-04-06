const router = require('express').Router(); // создали роутер
const {getBooks, getBookId, createBook, updateBook, deleteBook} = require('./../controllers/books');

router.get('/api/books/', getBooks);
router.get('/api/books/:id', getBookId);
router.post('/api/books', createBook)
router.put('/api/books/:id', updateBook)
router.delete('/api/books/:id', deleteBook)

module.exports = router;