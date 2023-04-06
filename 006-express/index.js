const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const { login } = require('./controllers/users');
const { getBooks, getBookId, createBook, updateBook, deleteBook } = require('./controllers/books');

app.listen(3000, () => {
    // Если всё работает, консоль покажет, какой порт приложение слушает
    console.log(`App listening on port 3000`)
})

app.use(bodyParser.json());

app.post('/api/user/login', login);
app.get('/api/books/', getBooks);
app.get('/api/books/:id', getBookId);
app.post('/api/books', createBook)
app.put('/api/books/:id', updateBook)
app.delete('/api/books/:id', deleteBook)