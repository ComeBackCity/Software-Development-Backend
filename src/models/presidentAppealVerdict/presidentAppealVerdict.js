const database = require('../../utils/database/database');
const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const presidentAppealVerdictSchema = mongoose.Schema({
	case: {
		type: String,
		required: true,
		ref: 'Case'
	},

	date: {
		type: Date,
		required: true,
		default: Date.now
	},

	president: {
		type: String,
		required: true
	},

	accepted: {
		type: Boolean,
		required: true
	},

	description: {
		type: String,
		required: true
	},

	documents: {
		type: [String],
		required: true
	}
});

const presidentAppealVerdict = database.model(
	'President Appeal Verdict',
	presidentAppealVerdictSchema
);

module.exports = presidentAppealVerdict;
