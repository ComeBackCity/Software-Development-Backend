const express = require('express');
const router = new express.Router();

const login = require('../functions/officer/login');
const new_officer = require('../functions/officer/new_officer');
const getOfficersList = require('../functions/officer/officerList');
const new_gd = require('../functions/gd/createGD');
const searchGD = require('../functions/gd/searchGD');
const gdByID = require('../functions/gd/gdByID');
const assignOfficerGd = require('../functions/gd/assignOfficer');
const updateGD = require('../functions/gd/updateGD');
const new_fir = require('../functions/fir/createFIR');
const searchFIR = require('../functions/fir/searchFIR');
const new_case = require('../functions/cases/createCase');
const searchCase = require('../functions/cases/searchCase');
const assignOfficerCase = require('../functions/cases/assignOfficer');
const updateCase = require('../functions/cases/updateCase');
const caseByID = require('../functions/cases/caseByID');
const officer_auth = require('../middleware/officer_auth');
const createTask = require('../functions/tasks/create');
const searchTask = require('../functions/tasks/search');
const taskByID = require('../functions/tasks/searchByID');
const updateTask = require('../functions/tasks/update');
const createHearing = require('../functions/hearing/create');
const createVerdict = require('../functions/verdict/create');
const createAppeal = require('../functions/appeal/create');
const createAppealVerdict = require('../functions/appealVerdict/create');
const createPresidentAppeal = require('../functions/presidentAppeal/create');
const createPresidentAppealVerdict = require('../functions/presidentAppealVerdict/create');
const createCS = require('../functions/chargeSheet/create');
const createIR = require('../functions/investigationReport/create');
const createResolve = require('../functions/resolve/create');

//routes
router.post('/officer/login', login);
router.post('/officer/new', new_officer);
router.post('/officer/get/all', officer_auth, getOfficersList);

//gd
router.post('/officer/gd/create', officer_auth, new_gd);
router.get('/officer/gd/search', officer_auth, searchGD);
router.get('/officer/gd/byID', officer_auth, gdByID);
router.post('/officer/gd/assign', officer_auth, assignOfficerGd);
router.post('/officer/gd/update', officer_auth, updateGD);

//fir
router.post('/officer/fir/create', officer_auth, new_fir);
router.get('/officer/fir/search', officer_auth, searchFIR);

//cases
router.post('/officer/case/create', officer_auth, new_case);
router.get('/officer/case/search', officer_auth, searchCase);
router.post('/officer/case/assign', officer_auth, assignOfficerCase);
router.get('/officer/case/byID', officer_auth, caseByID);
router.post('/officer/case/update', officer_auth, updateCase);

//task
router.post('/officer/tasks/create', createTask);
router.get('/officer/tasks/search', searchTask);
router.get('/officer/tasks/byID', taskByID);
router.patch('/officer/tasks/update', updateTask);

//charge sheet
router.post('/officer/chargeSheet/create', officer_auth, createCS);

//investigation report
router.post('/officer/investigationReport/create', officer_auth, createIR);

//hearing
router.post('/officer/hearing/create', officer_auth, createHearing);

//verdict
router.post('/officer/verdict/create', officer_auth, createVerdict);

//appeal
router.post('/officer/appeal/create', officer_auth, createAppeal);
router.post('/officer/appeal/verdict/create', officer_auth, createAppealVerdict);

//president appeal
router.post('/officer/presidentAppeal/create', officer_auth, createPresidentAppeal);
router.post('/officer/presidentAppeal/verdict/create', officer_auth, createPresidentAppealVerdict);

//resolve
router.post('/officer/resolve/create', officer_auth, createResolve);

module.exports = router;
