const thanaModel = require('../../models/misc/thana');

const createThana = async (req, res) => {
	await thanaModel.insertMany(req.body);
};

module.exports = createThana;
