const express = require('express')
const router = new express.Router()

const login = require('../functions/officer/login')
const new_officer = require('../functions/officer/new_officer')
const new_gd =require('../functions/gd/createGD')

const officer_auth = require('../middleware/officer_auth')

router.get('/officer/login',login)
router.post('/officer/new',new_officer)

router.post('/officer/gd/create',officer_auth,new_gd)

module.exports = router
