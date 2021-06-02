const express = require('express')
const router = new express.Router()

const login = require('../functions/officer/login')
const new_officer = require('../functions/officer/new_officer')
const new_gd = require('../functions/gd/createGD')
const searchGD = require('../functions/gd/searchGD')
const new_fir = require('../functions/fir/createFIR')
const searchFIR = require('../functions/fir/searchFIR')
const officer_auth = require('../middleware/officer_auth')


//routes
router.post('/officer/login', login)
router.post('/officer/new', new_officer)

router.post('/officer/gd/create', officer_auth, new_gd)
router.get('/officer/gd/search', officer_auth, searchGD)

router.post('/officer/fir/create', officer_auth, new_fir)
router.get('/officer/fir/search', officer_auth, searchFIR)

module.exports = router
