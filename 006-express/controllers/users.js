const login = (req, res) => { // логин
    res.status(201).send(
        { id: 1, mail: "test@mail.ru" },
    );
    console.log(escape(name));
}

module.exports = { login };