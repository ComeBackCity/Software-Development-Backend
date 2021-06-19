const database = require('../../utils/database/database');

const thana = database.model('Thana', {
	division: {
		type: String,
		required: true
	},

	district: {
		type: String,
		required: true
	},

	thana: {
		type: String,
		required: true
	}
});

module.exports = thana;
