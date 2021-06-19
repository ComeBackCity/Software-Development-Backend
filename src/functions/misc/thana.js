const thanaModel = require('../../models/misc/thana');
const status_codes = require('../../utils/status_codes');

const createThana = async (req, res) => {
	await thanaModel.insertMany(req.body);
};

module.exports = createThana;
