const database = require('../../utils/database/database');

const user = database.model('User', {
	name: {
		type: String,
		required: true,
		trim: true
	},

	nid: {
		type: String,
		required: true,
		trim: true,
		unique: true
	},

	phone_no: {
		type: String,
		required: true,
		trim: true,
		unique: true
	},

	password: {
		type: String,
		required: true
	}
});

module.exports = user;
