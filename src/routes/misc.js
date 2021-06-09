const express = require('express')
const router = new express.Router()

const createThana = require('../functions/misc/thana')

router.post('/thana/create', createThana)

module.exports = router
