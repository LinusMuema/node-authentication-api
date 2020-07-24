const express = require('express')
const router = express.Router()
const controller = require('../controllers/auth.controller')

router.get('/login', controller.login);

router.post('/signup', controller.signup);

module.exports = router
