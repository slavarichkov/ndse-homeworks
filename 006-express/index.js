const express = require('express');
const app = express(); 

const {login} = require('./controllers/users');
const {getBooks, getBookId, createBook, updateBook, deleteBook} = require('./controllers/books');

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
    // Если всё работает, консоль покажет, какой порт приложение слушает
    console.log(`App listening on port ${PORT}`)
}) 

app.post('/api/user/login', login);
app.get('/api/books/', getBooks);
app.get('/api/books/:id', getBookId);
app.post('/api/books', createBook)
app.put('/api/books/:id', updateBook)
app.delete('/api/books/:id', deleteBook)