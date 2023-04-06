const router = require('express').Router(); // создали роутер
const { getBooks, getBookId, createBook, updateBook, deleteBook, downloadBook } = require('./../controllers/books'); // контроллеры

const fileMulter = require('./../middlewares/file')

router.get('/api/books/', getBooks);
router.get('/api/books/:id', getBookId);
router.post('/api/books', fileMulter.single('name-book'), createBook)
router.put('/api/books/:id', updateBook)
router.delete('/api/books/:id', deleteBook)
router.get('/api/books/:id/download', downloadBook);

module.exports = router;