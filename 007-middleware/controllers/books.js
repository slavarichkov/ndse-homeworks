const express = require('express');

const fileMulter = require('./../middlewares/file')
const { books } = require('./../utils/db')

let idBook = 2; // хардкодим айди книги
let newBooks = books;

const getBooks = (req, res) => { // получить все книги
    res.status(200).send({ books });
}

const getBookId = (req, res) => { // найти книгу по айди
    const { Id } = req.params; // получим из объекта запроса уникальный id книги
    let findBook = books.find((book) => book.id === Id)
    if (findBook !== undefined) {
        res.status(200).send({ findBook });
    } else {
        res.status(404).send({ massage: "книга не найдена" });
    }
}

const createBook = (req, res) => { // создать книгу
    const {
        Json
    } = req.body; // получим из объекта запроса описание карточки
    let dataBook = JSON.parse(Json)
    console.log(dataBook)
    const { path, filename } = req.file  // получим из объекта запроса путь до файла
    newBooks.push({
        id: dataBook.id,
        title: dataBook.title,
        description: dataBook.description,
        authors: dataBook.authors,
        favorite: dataBook.favorite,
        fileCover: dataBook.fileCover,
        fileName: filename,
        fileBook: path,
    })
    let newBook = books.find((book) => book.id === dataBook.id)
    res.status(200).send({ newBook });
}

const updateBook = (req, res) => {
    const { Id } = req.params; // получим из объекта запроса уникальный id книги
    let findBook = books.find((book) => book.id === Id)
    if (findBook !== undefined) {
        res.status(200).send({ findBook });
    } else {
        res.status(404).send({ massage: "книга не найдена" });
    }
}

const deleteBook = (req, res) => {
    const { Id } = req.params; // получим из объекта запроса уникальный id книги
    newBooks = books.filter((book) => book.id !== Id) // новый массив без удаленной книги
    res.status(200).send({ massage: 'ok' });
};

const downloadBook = (req, res) => { // скачать книгу
    const { Id } = req.params; // получим из объекта запроса уникальный id книги
    let findBook = books.find((book) => book.id === Id) // найдем книгу по id
    let placeBook = findBook.fileBook; // найдем путь до книги для скачивания

    express.static(__dirname + placeBook)
}

module.exports = { getBooks, getBookId, createBook, updateBook, deleteBook, downloadBook };