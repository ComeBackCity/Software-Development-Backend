const express = require('express');
const router = new express.Router();

const login = require('../functions/officer/login');
const new_officer = require('../functions/officer/new_officer');
const getOfficersList = require('../functions/officer/officerList');
const new_gd = require('../functions/gd/createGD');
const searchGD = require('../functions/gd/searchGD');
const new_fir = require('../functions/fir/createFIR');
const searchFIR = require('../functions/fir/searchFIR');
const new_case = require('../functions/cases/createCase');
const searchCase = require('../functions/cases/searchCase');
// const updateCase = require('../functions/cases/updateCase')
const caseByID = require('../functions/cases/caseByID');
const officer_auth = require('../middleware/officer_auth');
const createTask = require('../functions/tasks/create');
const searchTask = require('../functions/tasks/search');
const taskByID = require('../functions/tasks/searchByID');
const updateTask = require('../functions/tasks/update');

//routes
router.post('/officer/login', login);
router.post('/officer/new', new_officer);
router.post('/officer/get/all', getOfficersList);

//gd
router.post('/officer/gd/create', officer_auth, new_gd);
router.get('/officer/gd/search', officer_auth, searchGD);

//fir
router.post('/officer/fir/create', officer_auth, new_fir);
router.get('/officer/fir/search', officer_auth, searchFIR);

//cases
router.post('/officer/case/create', new_case);
router.get('/officer/case/search', searchCase);
// router.post('/officer/case/update', updateCase)
router.get('/officer/case/byID', caseByID);

//task
router.post('/officer/tasks/create', createTask);
router.get('/officer/tasks/search', searchTask);
router.get('/officer/tasks/byID', taskByID);
router.patch('/officer/tasks/update', updateTask);

module.exports = router;
