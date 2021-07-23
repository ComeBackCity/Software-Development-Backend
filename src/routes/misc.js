const express = require('express');
const router = new express.Router();

const createThana = require('../functions/misc/thana');
const getThana = require('../functions/misc/findThana');

router.post('/thana/create', createThana);
router.post('/thana/get', getThana);

module.exports = router;
