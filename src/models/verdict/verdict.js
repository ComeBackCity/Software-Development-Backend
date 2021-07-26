const database = require('../../utils/database/database');
const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const verdictSchema = mongoose.Schema({
	case: {
		type: String,
		required: true,
		ref: 'Case'
	},

	verdict_no: {
		type: String,
		required: true
	},

	name_of_court: {
		type: String,
		required: true
	},

	judge: {
		type: String,
		required: true
	},

	state_lawyer: {
		type: String,
		required: true
	},

	defending_lawyer: {
		type: String,
		required: true
	},

	short_description: {
		type: String,
		required: true
	},

	detailed_description: {
		type: String,
		required: true
	},

	date: {
		type: Date,
		required: true
	},

	criminals: {
		type: [
			{
				name: {
					type: String,
					required: true
				},

				accusation: {
					type: String,
					required: true
				},

				result: {
					type: String,
					required: true
				},

				verdict: {
					type: String,
					required: true
				}
			}
		]
	},

	primary_documents: {
		type: [String],
		required: true
	}
});

const verdict = database.model('Verdict', verdictSchema);

module.exports = verdict;
