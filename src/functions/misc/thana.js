const thanaModel = require('../../models/misc/thana');

const createThana = async (req, res) => {
	await thanaModel
		.insertMany(req.body)
		.then(r => {
			return res.json({
				message: 'Success'
			});
		})
		.catch(err => {
			return res.json(err);
		});
};

module.exports = createThana;
