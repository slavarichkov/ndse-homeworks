const getBooks = (req, res) => {
    res.status(201)
    //работа с БД
}

const getBookId = (req, res) => {
    const { id } = req.params; // получим из объекта запроса имя и описание пользователя
    //работа с БД
}

const createBook = (req, res) => {
    const {
        id,
        title,
        description,
        authors,
        favorite,
        fileCover,
        fileName
    } = req.body
    //работа с БД
}

const updateBook = (req, res) => {
    const {
        id,
        title,
        description,
        authors,
        favorite,
        fileCover,
        fileName
    } = req.body
    const { idBook } = req.params
    //работа с БД
}

const deleteBook = (req, res) => {
    const { idBook } = req.params
    //работа с БД
};

module.exports = { getBooks, getBookId, createBook, updateBook, deleteBook };