const router = require('express').Router(); // создали роутер
const {getBooks, getBookId, createBook, updateBook, deleteBook, downloadBook} = require('./../controllers/books'); // контроллеры

router.get('/api/books/', getBooks);
router.get('/api/books/:id', getBookId);
router.post('/api/books', createBook)
router.put('/api/books/:id', updateBook)
router.delete('/api/books/:id', deleteBook)
router.get('/api/books/:id/download', downloadBook);

module.exports = router;