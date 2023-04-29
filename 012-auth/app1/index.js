const express = require('express');
const mongoose = require('mongoose');

const errorMiddleware = require('./middleware/error');

const indexRouter = require('./routes/index');
const bookRouter = require('./routes/book');

// Подключение к MongoDB

// подключаемся к mongo и затем к серверу
mongoose.connect('mongodb://127.0.0.1/library')
    .then(() => {
        console.log('DB OK');
        app.listen(NODE_ENV === 'production' ? PORT : 3000, () => {
            console.log(`App listening on port ${PORT}`);
        });
    })
    .catch((err) => console.log(err));

//mongoose.connect('mongodb://localhost:27017/library');
mongoose.set('strictQuery', true); // в mmongoose v7 параметр авто в false не строгое соотв схеме

const app = express();
app.use(express.urlencoded());
app.set("view engine", "ejs");

app.use('/', indexRouter);
app.use('/book', bookRouter);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен, порт: ${PORT}`);
})