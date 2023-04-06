const router = require('express').Router(); // создали роутер

router.post('/api/user/login', login);

module.exports = router;