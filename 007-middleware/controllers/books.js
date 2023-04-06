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
    // idBook = (idBook + 1);
    // fileMulter.single("name-book"), //Принимает один файл с именем name-book. Файл будет сохранен в req.file.
    //     (req, res) => {
    //         if (req.file) {
    //             const { path } = req.file // полный путь к загружаемому файлу
    //             res.json({ path })
    //         }
    //         res.json()
    //     }
    // books.push({
    //     id: idBook.toString(),
    //     title: "string",
    //     description: "string",
    //     authors: "string",
    //     favorite: "string",
    //     fileCover: "string",
    //     fileName: "string",
    //     fileBook: path,
    // })
    // let newBook = books.find((book) => book.id === idBook.toString())
    // res.status(200).send({ newBook });
    console.log(req)
    res.status(200).send({ req });
}

const updateBook = (req, res) => { // обновить книгу
    const { Id } = req.params; // получим из объекта запроса уникальный id книги
    let findBook = books.find((book) => book.id === Id)
    if (findBook !== undefined) {
        res.status(200).send({ findBook });
    } else {
        res.status(404).send({ massage: "книга не найдена" });
    }
}

const deleteBook = (req, res) => { // удалить книгу
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

const uploadBook = (req, res) => { // загрузить книгу
    fileMulter.single("name-book"), //Принимает один файл с именем name-book. Файл будет сохранен в req.file.
        (req, res) => {
            if (req.file) {
                const { path } = req.file // полный путь к загружаемому файлу
                res.json({ path })
            }
            res.json()
        }
}

module.exports = { getBooks, getBookId, createBook, updateBook, deleteBook, downloadBook };