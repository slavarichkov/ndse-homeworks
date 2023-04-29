const express = require('express');
const router = express.Router();
//const { v4: uuid } = require('uuid');

const bookMdl = require('./../models/book'); // импортировать схему БД

class Book {
    constructor(title = "", desc = "", view = 0, _id) {
        this.title = title;
        this.desc = desc;
        this.id = _id;
        this.view = view;
    }
}
const stor = {
    book: [],
};

function startBook() {
    bookMdl.find({}).then( // получить все книги из БД и отобразить
        (books) => books.map((el) => {
            const newBook = new Book(`book ${el.title}`, `desc book ${el.description}`, 0, el._id);
            stor.book.push(newBook);
        })
    )
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

async function viewBooks() {
    await startBook(); // наполнить массив шаблоном
    await addView(); // проставить просмотры
}

viewBooks() // отрисовать книги при загрузке страницы

router.get('/', (req, res) => {
    const { book } = stor;
    res.render("book/index", {
        title: "Books",
        book: book,
    });
});

router.get('/create', (req, res) => { // отрисовать страницу создания
    res.render("book/create", {
        title: "book | create",
        book: {},
    });
});

router.post('/create', (req, res) => { // отправить данные для создания книги
    const { title, desc } = req.body;
    bookMdl.create(
        {
            title,
            description: desc,
        }
    ).then((book) => {
        const newBook = new Book(book.title, book.desc);
        stor.book.push(newBook);
    }).catch((err) => console.log(err));
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
        const bookView = stor.book.find(book => book.id === id).view // получить просмотры книги из массива
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

router.post('/update/:id', (req, res) => { // обновить книгу
    const { book } = stor;
    const { id } = req.params;
    const { title, desc } = req.body;
    const idx = book.findIndex(el => el.id === id);

    bookMdl.findByIdAndUpdate(
        id, // айди для поиска
        { $set: { title, description: desc } }, // новые данные
        { new: true } // вернуть обновленный документ
    ).then((updateBook) => {
        console.log(updateBook);
        //viewBooks() // отрисовать книги
        book[idx] = {
            ...book[idx],
            title,
            desc,
        };
    }).catch((error) => { console.log(error) });

    if (idx === -1) {
        res.redirect('/404');
    }

    res.redirect(`/book/${id}`);
});

router.post('/delete/:id', (req, res) => {
    const { book } = stor;
    const { id } = req.params;
    const idx = book.findIndex(el => el.id === id);

    bookMdl.findByIdAndDelete(id)
        .then(() => {
            res.send("книга удалена");
            book.splice(idx, 1);
            res.redirect(`/book`);
            //viewBooks() // отрисовать новый список
        }).catch((err) => { console.log(err) })

    if (idx === -1) {
        res.redirect('/404');
    }


});

module.exports = router;