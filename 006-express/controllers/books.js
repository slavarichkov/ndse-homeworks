const { books } = require('./../utils/db')
let idBook = "2"; // хардкодим айди книги

const getBooks = (req, res) => { // получить все книги
    res.status(200).send({ books });
}

const getBookId = (req, res) => { // найти книгу по айди
    let findBook = books.find((book) => book.id === idBook)
    if (findBook !== undefined) {
        res.status(200).send({ findBook });
    } else {
        res.status(404).send({ massage: "книга не найдена" });
    }
}

const createBook = async (req, res) => { // создать книгу
    idBook = (idBook + 1).toString();
    await books.push({
        id: idBook,
        title: "string",
        description: "string",
        authors: "string",
        favorite: "string",
        fileCover: "string",
        fileName: "string"
    })
    let newBook = books.find((book) => book.id === idBook)
    res.status(200).send({ newBook });
}

const updateBook = (req, res) => {
    let findBook = books.find((book) => book.id === idBook)
    if (findBook !== undefined) {
        res.status(200).send({ findBook });
    } else {
        res.status(404).send({ massage: "книга не найдена" });
    }
}

const deleteBook = async (req, res) => {
    idBook = (idBook - 1).toString();
    await books.filter((book) => book.id !== idBook)
    res.status(200).send({ massage: 'ok' });
};

module.exports = { getBooks, getBookId, createBook, updateBook, deleteBook };