const caseModel = require('../../models/cases/case');
const status_codes = require('../../utils/status_codes');
const mongoose = require('../../utils/database/database');

const createCase = async (req, res) => {
	let officers = [];

	for (let officer of req.body.assigned_officers) {
		if (typeof officer.id === 'string') {
			officer.id = mongoose.Types.ObjectId(officer.id);
		}
		officers.push(officer);
	}

	req.body.assigned_officers = officers;

	caseModel
		.create({
			subject: req.body.subject,
			type: req.body.type,
			assigned_officers: req.body.assigned_officers,
			status: req.body.status,
			for: req.body.for,
			against: req.body.against,
			date: req.body.date,
			verdict: null,
			closed_date: null,
			description: req.body.description,
			documents: []
		})
		.then(r => {
			return res.status(status_codes.SUCCESS).json({
				message: 'Case documented successfully'
			});
		})
		.catch(error => {
			return res.status(status_codes.INTERNAL_SERVER_ERROR).json({
				message: error.message
			});
		});
};

module.exports = createCase;
