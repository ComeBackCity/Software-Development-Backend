const caseModel = require('../../models/cases/case');
const status_codes = require('../../utils/status_codes');
const mongoose = require('../../utils/database/database');

const createCase = async (req, res) => {
	let officers = [],
		officer;

	if (req.assigned_officers === undefined) {
		req.assigned_officers = [];
	}
	for (let i = 0; i < req.assigned_officers.length; i++) {
		officer = req.assigned_officers[i];
		if (typeof officer.id === 'string') {
			officer.id = mongoose.Types.ObjectId(officer.id);
		}
		officers.push(officer);
	}

	req.body.assigned_officers = officers;

	caseModel
		.create(req.body)
		.then(r => {
			return res.status(status_codes.SUCCESS).json({
				message: 'Case documented successfully'
			});
		})
		.catch(error => {
			console.log(error);
			return res.status(status_codes.INTERNAL_SERVER_ERROR).json({
				message: error.message
			});
		});
};

module.exports = createCase;
