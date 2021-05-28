const express = require('express')
const router = new express.Router()

const login = require('../functions/officer/login')
const new_officer = require('../functions/officer/new_officer')
const new_gd = require('../functions/gd/createGD')
// const {searchGDbyTitle, searchGDbyID} = require('../functions/gd/searchGD')
const searchGD = require('../functions/gd/searchGD')

const officer_auth = require('../middleware/officer_auth')

router.post('/officer/login', login)
router.post('/officer/new', new_officer)

router.post('/officer/gd/create', officer_auth, new_gd)
router.get('/officer/gd/search', officer_auth, searchGD)
// router.post('/officer/gd')

module.exports = router
