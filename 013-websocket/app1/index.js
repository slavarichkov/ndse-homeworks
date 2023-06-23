const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const path = require('path');
const passport = require('passport');
const bcrypt = require('bcrypt');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const socketIO = require('socket.io'); // добавлено

const User = require('./models/user');
const errorMiddleware = require('./middleware/error');
const indexRouter = require('./routes/index');
// Подключение к MongoDB

// подключаемся к mongo и затем к серверу
//mongoose.connect('mongodb://db:127.0.0.1/library')
mongoose.connect('mongodb://127.0.0.1/library')
    .then(() => {
        console.log('DB OK');
        app.listen(NODE_ENV === 'production' ? PORT : 3000, () => {
            console.log(`App listening on port ${PORT}`);
        });
    })
    .catch((err) => console.log(err));

//mongoose.connect('mongodb://localhost:27017/library');
mongoose.set('strictQuery', true); // в mmongoose v7 параметр авто в false не строгое соотв схеме

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
io.on('connection', (socket) => {
    console.log(`Socket ${socket.id} connected`);
});
const bookRouter = require('./routes/book')(io); //экспорт функции, которая возвращает объект Router из библиотеки Express. Эта функция принимает параметр io, который является экземпляром объекта Socket.IO.

// Настройка пути для статических файлов из node_modules
app.use(express.static('node_modules')); // обслуживание статических файлов из папки node_modules

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
                    done(null, userBook); // передаем пользователя в done для сохранения его сессии
                });
        })
        .catch(err => done(err));
}));

// Сохранение пользователя в сессию
passport.serializeUser((user, done) => {
    const userId = user.id.toString();
    done(null, userId);
});

// Загрузка пользователя из сессии
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then((user) => {
            done(null, user);
        })
        .catch((err) => { console.log(err); });
});

// Middleware для проверки авторизации
//В Passport.js, когда пользователь успешно аутентифицирован, его информация сохраняется в объекте req.user. Вызов метода req.isAuthenticated() вернет true, если req.user существует,
const authMiddleware = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/api/user/login?email=&password=');
};

app.use(express.static('public'));
app.use(express.urlencoded());
app.set("view engine", "ejs");

// Использование сессии в приложении
app.use(session({
    secret: 'mySecretKey',
    resave: false,
    saveUninitialized: false
}));

// Подключение модуля passport
app.use(passport.initialize());
app.use(passport.session());

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
    User.create(
        {
            email,
            password: hashedPassword
        }
    ).then((user) => {
        res.send({ user });
    })
    res.render(path.join(__dirname, 'views/auth/auth.ejs'), { email, password });
})

app.post('/api/user/login', passport.authenticate('local', {
    successRedirect: '/book',
    failureRedirect: '/api/user/login',
    failureFlash: true
}),
    (req, res) => {
        console.log("req.user: ", req.user)
        res.redirect('/')
    })


app.use(authMiddleware) // проверить авторизацию и пустить

app.use('/', indexRouter);
app.use('/book', bookRouter);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен, порт: ${PORT}`);
})