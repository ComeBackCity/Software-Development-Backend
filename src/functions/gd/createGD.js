const mongoose = require('mongoose');
const gdModel = require('../../models/gd/gd');
const status_codes = require('../../utils/status_codes');

const new_GD = async (req, res) => {
	let officers = [];

	for (let officer of req.body.assigned_officers) {
		if (typeof officer.id === 'string') {
			officer.id = mongoose.Types.ObjectId(officer.id);
		}
		officers.push(officer);
	}

	req.body.assigned_officers = officers;

	await gdModel
		.create({
			topic: req.body.topic,
			title: req.body.title,
			description: req.body.description,
			for: req.body.for,
			against: req.body.against,
			date: req.body.date,
			thana: req.body.thana,
			primary_documents: req.body.primary_documents,
			optional_documents: req.body.optional_documents
		})
		.then(r => {
			return res.status(status_codes.SUCCESS).json({
				message: 'GD documented successfully'
			});
		})
		.catch(err => {
			return res.status(status_codes.INTERNAL_SERVER_ERROR).json({
				message: err.message
			});
		});
};

module.exports = new_GD;
