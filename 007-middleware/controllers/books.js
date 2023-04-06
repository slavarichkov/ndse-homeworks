const express = require('express');

const fileMulter = require('./../middlewares/file')
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
        Json
    } = req.body; // получим из объекта запроса описание карточки
    let dataBook = JSON.parse(Json)
    const { path, filename } = req.file  // получим из объекта запроса путь до файла
    books.push({
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
    console.log(books)
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
    books = books.filter((book) => book.id !== id) // новый массив без удаленной книги
    res.status(200).send({ massage: 'ok' });
};

const downloadBook = (req, res) => { // скачать книгу
    const { id } = req.params; // получим из объекта запроса уникальный id книги
    let findBook = books.find((book) => book.id === id) // найдем книгу по id
    let path = findBook.fileBook; // найдем путь до книги для скачивания
    res.download(path); // загрузить файл, передать путь
    res.status(200).send({ findBook });
}

module.exports = { getBooks, getBookId, createBook, updateBook, deleteBook, downloadBook };