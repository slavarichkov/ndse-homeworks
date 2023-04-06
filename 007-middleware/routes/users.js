const router = require('express').Router(); // создали роутер

const { login } = require('./../controllers/users')

router.post('/api/user/login', login);

module.exports = router;