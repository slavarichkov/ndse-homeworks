const { books } = require('./../utils/db')
let idBook = 2; // хардкодим айди книги
let newBooks = books;

const getBooks = (req, res) => { // получить все книги
    res.status(200).send({ books });
}

const getBookId = (req, res) => { // найти книгу по айди
    const { id } = req.params; // получим из объекта запроса уникальный id книги
    let findBook = books.find((book) => book.id === id)
    if (findBook !== undefined) {
        res.status(200).send({ findBook });
    } else {
        res.status(404).send({ massage: "книга не найдена" });
    }
}

const createBook = (req, res) => { // создать книгу
    const {
        id,
        title,
        description,
        authors,
        favorite,
        fileCover,
        fileName,
    } = req.body; // получим из объекта запроса описание карточки
    newBooks.push({
        id,
        title,
        description,
        authors,
        favorite,
        fileCover,
        fileName,
    })
    let newBook = books.find((book) => book.id === id)
    res.status(200).send({ newBook });
}

const updateBook = (req, res) => {
    const { id } = req.params; // получим из объекта запроса уникальный id книги
    let findBook = books.find((book) => book.id === id)
    if (findBook !== undefined) {
        res.status(200).send({ findBook });
    } else {
        res.status(404).send({ massage: "книга не найдена" });
    }
}

const deleteBook = (req, res) => {
    const { id } = req.params; // получим из объекта запроса уникальный id книги
    newBooks = books.filter((book) => book.id !== id) // новый массив без удаленной книги
    res.status(200).send({ massage: 'ok' });
};

module.exports = { getBooks, getBookId, createBook, updateBook, deleteBook };