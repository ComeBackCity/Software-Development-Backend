const database = require('../../utils/database/database');
const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const appealVerdictSchema = mongoose.Schema({
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

	court: {
		type: String,
		required: true
	},

	judge: {
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

	document: {
		type: String,
		required: true
	}
});

const appealVerdict = database.model('Appeal Verdict', appealVerdictSchema);

module.exports = appealVerdict;