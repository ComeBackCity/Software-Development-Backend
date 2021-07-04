const express = require('express');
const router = new express.Router();

const login = require('../functions/officer/login');
const new_officer = require('../functions/officer/new_officer');
const getOfficersList = require('../functions/officer/officerList');
const new_gd = require('../functions/gd/createGD');
const searchGD = require('../functions/gd/searchGD');
const gdByID = require('../functions/gd/gdByID');
const new_fir = require('../functions/fir/createFIR');
const searchFIR = require('../functions/fir/searchFIR');
const new_case = require('../functions/cases/createCase');
const searchCase = require('../functions/cases/searchCase');
const assignOfficer = require('../functions/cases/assignOfficer');
const caseByID = require('../functions/cases/caseByID');
const officer_auth = require('../middleware/officer_auth');
const createTask = require('../functions/tasks/create');
const searchTask = require('../functions/tasks/search');
const taskByID = require('../functions/tasks/searchByID');
const updateTask = require('../functions/tasks/update');

//routes
router.post('/officer/login', login);
router.post('/officer/new', new_officer);
router.post('/officer/get/all', officer_auth, getOfficersList);

//gd
router.post('/officer/gd/create', officer_auth, new_gd);
router.get('/officer/gd/search', officer_auth, searchGD);
router.get('/officer/gd/byID', officer_auth, gdByID);

//fir
router.post('/officer/fir/create', officer_auth, new_fir);
router.get('/officer/fir/search', officer_auth, searchFIR);

//cases
router.post('/officer/case/create', officer_auth, new_case);
router.get('/officer/case/search', officer_auth, searchCase);
router.post('/officer/case/assign', officer_auth, assignOfficer);
router.get('/officer/case/byID', officer_auth, caseByID);

//task
router.post('/officer/tasks/create', createTask);
router.get('/officer/tasks/search', searchTask);
router.get('/officer/tasks/byID', taskByID);
router.patch('/officer/tasks/update', updateTask);

module.exports = router;
