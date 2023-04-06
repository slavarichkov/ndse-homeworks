const express = require('express');
//const path = require('path');
const app = express();

const bodyParser = require('body-parser');

const booksRouters = require('./routes/books'); // роутеры книг
const usersRouters = require('./routes/users'); // роутер пользователей

app.listen(3000, () => {
    // Если всё работает, консоль покажет, какой порт приложение слушает
    console.log(`App listening on port 3000`)
})

app.use(bodyParser.json());

app.use('/', booksRouters); // подключаем роутер книг
app.use('/', usersRouters); // подключаем роутер книг