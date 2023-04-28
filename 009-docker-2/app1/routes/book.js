const express = require('express');
const router = express.Router();
const { v4: uuid } = require('uuid');

class Book {
    constructor(title = "", desc = "", view = 0, id = uuid()) {
        this.title = title;
        this.desc = desc;
        this.id = id;
        this.view = view;
    }
}
const stor = {
    book: [],
};

async function startBook() {
    [1, 2, 3].map((el) => {
        const newBook = new Book(`book ${el}`, `desc book ${el}`, 0);
        stor.book.push(newBook);
    });
}

async function addView() {
    for (let i = 0; i < stor.book.length; i++) {
        const el = stor.book[i];
        const idBook = el.id;
        const response = await fetch(`http://counter:3001/counter/${idBook}`);
        const view = await response.json(); // количество просмотров приходит ответом
        el.view = view.count
    }
}

async function createBooks() {
    startBook(); // наполнить массив шаблоном
    addView(); // проставить просмотры
}

createBooks()

router.get('/', (req, res) => {
    const { book } = stor;
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
    const { book } = stor;
    const { title, desc } = req.body;

    const newBook = new Book(title, desc);
    book.push(newBook);

    res.redirect('/book')
});

router.get('/:id', async (req, res) => { // просмотр книги
    const { book } = stor;
    const { id } = req.params;
    const idx = book.findIndex(el => el.id === id);
    if (idx === -1) {
        res.redirect('/404');
    }

    try {
        const response = await fetch(`http://counter:3001/counter/${id}/incr`, { // отправить запрос на контейнер counter для увеличение счетчика просмотра
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const data = await response.json();
        const bookView  = stor.book.find(book => book.id === id).view // получить просмотры книги из массива
        bookView = data.view; // обновить данные 
    }
    catch (error) { console.error(error); }


    res.render("book/view", {
        title: "book | view",
        book: book[idx],
    });

});

router.get('/update/:id', (req, res) => {
    const { book } = stor;
    const { id } = req.params;
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
    const { book } = stor;
    const { id } = req.params;
    const { title, desc } = req.body;
    const idx = book.findIndex(el => el.id === id);

    if (idx === -1) {
        res.redirect('/404');
    }

    book[idx] = {
        ...book[idx],
        title,
        desc,
    };
    res.redirect(`/book/${id}`);
});

router.post('/delete/:id', (req, res) => {
    const { book } = stor;
    const { id } = req.params;
    const idx = book.findIndex(el => el.id === id);

    if (idx === -1) {
        res.redirect('/404');
    }

    book.splice(idx, 1);
    res.redirect(`/book`);
});

module.exports = router;