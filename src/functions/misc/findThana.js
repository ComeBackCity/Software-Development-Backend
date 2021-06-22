const thanaModel = require('../../models/misc/thana');
const status_codes = require('../../utils/status_codes');

const findThana = async (req, res) => {
	await thanaModel
		.findOne(req.body)
		.then(r => {
			res.status(status_codes.SUCCESS).json(r);
		})
		.catch(err => {
			res.status(status_codes.DATA_NOT_FOUND).json({
				error: err.me
			});
		});
};

module.exports = findThana;
