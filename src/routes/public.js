const express = require('express')
const router = new express.Router()

const signUp = require('../functions/Authentication/signup')
const login = require('../functions/Authentication/login')

router.post('/public/signup', signUp)
router.post('/public/login', login)

module.exports = router
