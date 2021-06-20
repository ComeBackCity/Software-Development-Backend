const gdModel = require('../../models/gd/gd');
const status_codes = require('../../utils/status_codes');

const new_GD = async (req, res) => {
	await gdModel
		.create({
			topic: req.body.topic,
			title: req.body.title,
			description: req.body.description,
			for: req.body.for,
			against: req.body.against,
			date: req.body.date,
			primary_document: req.body.primary_document,
			optional_documents: req.body.optional_documents
		})
		.then(r => {
			return res.status(status_codes.SUCCESS).json({
				message: 'GD documented successfully'
			});
		})
		.catch(err => {
			return res.status(status_codes.INTERNAL_SERVER_ERROR).json({
				message: 'Could not create GD. Something went wrong'
			});
		});
};

module.exports = new_GD;
