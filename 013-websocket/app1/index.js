const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const passport = require('passport');
const bcrypt = require('bcrypt');
const session = require('express-session');
const socketIO = require('socket.io');
//const jwt = require('jsonwebtoken'); // импортируем модуль jsonwebtoken;
const LocalStrategy = require('passport-local').Strategy;
const errorMiddleware = require('./middleware/error');
const indexRouter = require('./routes/index');
const bookRouter = require('./routes/book');
const User = require('./models/user'); // модель пользователя

// Подключение к MongoDB

// подключаемся к mongo и затем к серверу
//mongoose.connect('mongodb://db:127.0.0.1/library')
mongoose.connect('mongodb://127.0.0.1/library')
    .then(() => {
        console.log('DB OK');
        app.listen(NODE_ENV === 'production' ? PORT : 3000, () => {
            console.log(`App listening on port ${PORT}`);
        });
        const io = socketIO(server); // Подключаем Socket.io к нашему серверу
    })
    .catch((err) => console.log(err));

//mongoose.connect('mongodb://localhost:27017/library');
mongoose.set('strictQuery', true); // в mmongoose v7 параметр авто в false не строгое соотв схеме

const app = express();
app.use(express.urlencoded());
app.set("view engine", "ejs");


// Конфигурация локальной стратегии
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, (email, password, done, res) => {
    User.findOne({ email })
        .then(userBook => {
            if (!userBook) {
                return done(null, false, { message: 'Invalid email or password.' });
            }
            return bcrypt.compare(password, userBook.password) // проверить пароль, если польз найден
                .then((matched) => {
                    if (!matched) { // хеши (пароль) не совпали
                        throw new UNAUTHORIZED_M('Неправильная почта или пароль');
                    }
                    console.log()
                    done(null, userBook); // передаем пользователя в done для сохранения его сессии
                });
        })
        .catch(err => done(err));
}));

// Сохранение пользователя в сессию
passport.serializeUser((userBook, done) => {
    const idUser = userBook._id.toString();
    done(null, idUser);
    console.log(idUser);
});

// Загрузка пользователя из сессии
passport.deserializeUser((idUser, done) => {
    User.findById(idUser, (err, userBook) => {
        done(err, userBook);
    });
    console.log(idUser)
});


// Middleware для проверки авторизации
//В Passport.js, когда пользователь успешно аутентифицирован, его информация сохраняется в объекте req.user. Вызов метода req.isAuthenticated() вернет true, если req.user существует,
const authMiddleware = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    //res.send(req.isAuthenticated())
    res.redirect('/api/user/login?email=&password=');
};

// Настройка Passport.js
app.use(passport.initialize());
app.use(session({
    secret: 'mySecretKey',
    resave: false,
    saveUninitialized: false,
}));

app.get('/api/user/login', (req, res) => { // авторизация
    res.render(path.join(__dirname, 'views/auth/auth.ejs'), { email: '', password: '' });
})

app.get('/api/user/signup', (req, res) => { // регистрация
    res.render(path.join(__dirname, 'views/auth/reg.ejs'));
})

app.post('/api/user/signup', (req, res) => {
    const { email, password } = req.body;
    // Хэшируем пароль
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    console.log(password)
    User.create(
        {
            email,
            password: hashedPassword
        }
    ).then(() => {
        res.send("пользователь создан");

    })
    res.render(path.join(__dirname, 'views/auth/auth.ejs'), { email, password });
})

app.post('/api/user/login', passport.authenticate('local', {
    successRedirect: '/book',
    failureRedirect: '/api/user/login',
    failureFlash: true
}));

app.use(authMiddleware) // проверить авторизацию и пустить

app.use('/', indexRouter);
app.use('/book', bookRouter);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен, порт: ${PORT}`);
})