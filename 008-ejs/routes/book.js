const express = require('express');
const router = express.Router();
const { v4: uuid } = require('uuid');

class Book {
    constructor(title = "", desc = "", id = uuid()) {
        this.title = title;
        this.desc = desc;
        this.id = id;
    }
}
const stor = {
    book: [],
};

[1, 2, 3].map(el => {
    const newBook = new Book(`book ${el}`, `desc book ${el}`);
    stor.book.push(newBook);
});

router.get('/', (req, res) => {
    const {book} = stor;
    res.render("book/index", {
        title: "Books",
        book: book,
    });
});

router.get('/create', (req, res) => {
    res.render("book/create", {
        title: "book | create",
        book: {},
    });
});

router.post('/create', (req, res) => {
    const {book} = stor;
    const {title, desc} = req.body;

    const newBook = new Book(title, desc);
    book.push(newBook);

    res.redirect('/book')
});

router.get('/:id', (req, res) => {
    const {book} = stor;
    const {id} = req.params;
    const idx = book.findIndex(el => el.id === id);

    if (idx === -1) {
        res.redirect('/404');
    } 
        
    res.render("book/view", {
        title: "book | view",
        book: book[idx],
    });
    
});

router.get('/update/:id', (req, res) => {
    const {book} = stor;
    const {id} = req.params;
    const idx = book.findIndex(el => el.id === id);

    if (idx === -1) {
        res.redirect('/404');
    } 

    res.render("book/update", {
        title: "book | view",
        book: book[idx],
    });
});

router.post('/update/:id', (req, res) => {
    const {book} = stor;
    const {id} = req.params;
    const {title, desc} = req.body;
    const idx = book.findIndex(el => el.id === id);

    if (idx === -1) {
        res.redirect('/404');
    } 

    todo[idx] = {
        ...book[idx],
        title,
        desc,
    };
    res.redirect(`/book/${id}`);
});

router.post('/delete/:id', (req, res) => {
    const {book} = stor;
    const {id} = req.params;
    const idx = book.findIndex(el => el.id === id);

    if (idx === -1) {
        res.redirect('/404');
    } 

    book.splice(idx, 1);
    res.redirect(`/book`);
});

module.exports = router;