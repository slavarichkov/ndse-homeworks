const express = require('express');
const router = express.Router();

router.get('/api/user/login', (req, res) => {
    res.render("./auth.js");
});

router.post('/api/user/login', (req, res) => {
    const { email } = req.body;
    const { password } = req.body;
    res.render("./auth.js");
})