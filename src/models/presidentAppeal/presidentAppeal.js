const database = require('../../utils/database/database');
const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const presidentAppealSchema = mongoose.Schema({
	case: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'Case'
	},

	date: {
		type: Date,
		required: true,
		default: Date.now
	},

	applicant: {
		type: String,
		required: true
	},

	application: {
		type: String,
		required: true
	},

	documents: {
		type: [String],
		required: true
	}
});

const presidentAppeal = database.model('President Appeal', presidentAppealSchema);

module.exports = presidentAppeal;
