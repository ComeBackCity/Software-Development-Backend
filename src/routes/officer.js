const express = require('express')
const router = new express.Router()

const login = require('../functions/officer/login')
const new_officer = require('../functions/officer/new_officer')
const getOfficersList = require('../functions/officer/officerList')
const new_gd = require('../functions/gd/createGD')
const searchGD = require('../functions/gd/searchGD')
const new_fir = require('../functions/fir/createFIR')
const searchFIR = require('../functions/fir/searchFIR')
const new_case = require('../functions/cases/createCase')
const searchCase = require('../functions/cases/searchCase')
// const updateCase = require('../functions/cases/updateCase')
const officer_auth = require('../middleware/officer_auth')


//routes
router.post('/officer/login', login)
router.post('/officer/new', new_officer)
router.get('/officer/get/all', getOfficersList)

//gd
router.post('/officer/gd/create', officer_auth, new_gd)
router.get('/officer/gd/search', officer_auth, searchGD)

//fir
router.post('/officer/fir/create', officer_auth, new_fir)
router.get('/officer/fir/search', officer_auth, searchFIR)

//cases
router.post('/officer/case/create', new_case)
router.get('/officer/case/search', searchCase)
// router.post('/officer/case/update', updateCase)

module.exports = router
