const database = require('../../utils/database/database');
const { Schema } = require('mongoose');

const officerToken = database.model('officerToken', {
	officer_id: {
		type: Schema.Types.ObjectId,
		required: true,
		unique: true
	},

	rank: {
		type: String,
		required: true,
		trim: true
	},

	thana: {
		type: Schema.Types.ObjectId,
		ref: 'Thana'
	},

	time: {
		type: Date,
		required: true,
		default: Date.now
	}
});

module.exports = officerToken;
