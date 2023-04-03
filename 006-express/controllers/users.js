const login = (req, res) => { // логин
    const { // получим из объекта запроса имя и описание пользователя
        email, password,
    } = req.body;
    res.status(201).send(
        { id: 1, mail: "test@mail.ru" },
    );
    console.log(escape(name));
}

module.exports = { login };