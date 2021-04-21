const express = require('express')
const router = new express.Router()

const login = require('../functions/officer/login')
const new_officer = require('../functions/officer/new_officer')

router.get('/officer/login',login)
router.post('/officer/new',new_officer)


module.exports = router
