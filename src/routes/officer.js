const express = require('express');
const router = new express.Router();

const login = require('../functions/officer/login');
const logout = require('../functions/officer/logout');
const new_officer = require('../functions/officer/new_officer');
const getOfficersList = require('../functions/officer/officerList');
const new_gd = require('../functions/gd/createGD');
const searchGD = require('../functions/gd/searchGD');
const gdByID = require('../functions/gd/gdByID');
const assignOfficerGd = require('../functions/gd/assignOfficer');
const updateGD = require('../functions/gd/updateGD');
const updateGDTimeline = require('../functions/gd/updateTimeline');
const new_fir = require('../functions/fir/createFIR');
const searchFIR = require('../functions/fir/searchFIR');
const new_case = require('../functions/cases/createCase');
const searchCase = require('../functions/cases/searchCase');
const assignOfficerCase = require('../functions/cases/assignOfficer');
const updateCase = require('../functions/cases/updateCase');
const caseByID = require('../functions/cases/caseByID');
const updateCaseTimeline = require('../functions/cases/updateTimeline');
const officer_auth = require('../middleware/officer_auth');
const createTask = require('../functions/tasks/create');
const searchTask = require('../functions/tasks/search');
const taskByID = require('../functions/tasks/searchByID');
const updateTask = require('../functions/tasks/update');
const createHearing = require('../functions/hearing/create');
const hearingByID = require('../functions/hearing/searchByID');
const createVerdict = require('../functions/verdict/create');
const verdictByID = require('../functions/verdict/searchByID');
const createAppeal = require('../functions/appeal/create');
const appealByID = require('../functions/appeal/searchByID');
const createAppealVerdict = require('../functions/appealVerdict/create');
const appealVerdictByID = require('../functions/appealVerdict/searchByID');
const createPresidentAppeal = require('../functions/presidentAppeal/create');
const presidentAppealByID = require('../functions/presidentAppeal/searchByID');
const createPresidentAppealVerdict = require('../functions/presidentAppealVerdict/create');
const presidentAppealVerdictByID = require('../functions/presidentAppealVerdict/searchByID');
const createCS = require('../functions/chargeSheet/create');
const csByID = require('../functions/chargeSheet/searchByID');
const createIR = require('../functions/investigationReport/create');
const irByID = require('../functions/investigationReport/searchByID');
const createResolve = require('../functions/resolve/create');
const resolveByID = require('../functions/resolve/searchByID');
const createCourt = require('../functions/courtInfo/create');
const courtByID = require('../functions/courtInfo/searchByID');
const gdCountPerDivision = require('../functions/visualize/gdCountPerDivision');

//routes
router.post('/officer/login', login);
router.post('/officer/new', new_officer);
router.post('/officer/get/all', officer_auth, getOfficersList);
router.post('/officer/logout', logout);

//gd
router.post('/officer/gd/create', officer_auth, new_gd);
router.get('/officer/gd/search', officer_auth, searchGD);
router.get('/officer/gd/byID', officer_auth, gdByID);
router.post('/officer/gd/assign', officer_auth, assignOfficerGd);
router.post('/officer/gd/update', officer_auth, updateGD);
router.post('/officer/gd/timeline', officer_auth, updateGDTimeline);

//fir
router.post('/officer/fir/create', officer_auth, new_fir);
router.get('/officer/fir/search', officer_auth, searchFIR);

//cases
router.post('/officer/case/create', officer_auth, new_case);
router.get('/officer/case/search', officer_auth, searchCase);
router.post('/officer/case/assign', officer_auth, assignOfficerCase);
router.get('/officer/case/byID', officer_auth, caseByID);
router.post('/officer/case/update', officer_auth, updateCase);
router.post('/officer/case/timeline', officer_auth, updateCaseTimeline);

//task
router.post('/officer/tasks/create', createTask);
router.get('/officer/tasks/search', searchTask);
router.get('/officer/tasks/byID', taskByID);
router.patch('/officer/tasks/update', updateTask);

//charge sheet
router.post('/officer/chargeSheet/create', officer_auth, createCS);
router.get('/officer/chargeSheet/byID', officer_auth, csByID);

//investigation report
router.post('/officer/investigationReport/create', officer_auth, createIR);
router.get('/officer/investigationReport/byID', officer_auth, irByID);

//hearing
router.post('/officer/hearing/create', officer_auth, createHearing);
router.get('/officer/hearing/byID', officer_auth, hearingByID);

//verdict
router.post('/officer/verdict/create', officer_auth, createVerdict);
router.get('/officer/verdict/byID', officer_auth, verdictByID);

//appeal
router.post('/officer/appeal/create', officer_auth, createAppeal);
router.get('/officer/appeal/byID', officer_auth, appealByID);
router.post('/officer/appeal/verdict/create', officer_auth, createAppealVerdict);
router.get('/officer/appeal/verdict/byID', officer_auth, appealVerdictByID);

//president appeal
router.post('/officer/presidentAppeal/create', officer_auth, createPresidentAppeal);
router.get('/officer/presidentAppeal/byID', officer_auth, presidentAppealByID);
router.post('/officer/presidentAppeal/verdict/create', officer_auth, createPresidentAppealVerdict);
router.get('/officer/presidentAppeal/verdict/byID', officer_auth, presidentAppealVerdictByID);

//resolve
router.post('/officer/resolve/create', officer_auth, createResolve);
router.get('/officer/resolve/byID', officer_auth, resolveByID);

//court
router.post('/officer/court/create', officer_auth, createCourt);
router.get('/officer/court/byID', officer_auth, courtByID);

//visualize
router.get('/officer/visualize/gd/perDivision', officer_auth, gdCountPerDivision);

module.exports = router;
