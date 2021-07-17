const database = require('../../utils/database/database');
const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const irSchema = mongoose.Schema({
	case: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'Case'
	},

	dhara: {
		type: String,
		required: true
	},

	date: {
		type: Date,
		required: true,
		default: Date.now
	},

	info_provider: {
		type: [
			{
				name: {
					type: String,
					required: true
				},

				address: {
					type: String,
					required: true
				},

				occupation: {
					type: String,
					required: true
				}
			}
		],

		required: true
	},

	evidences: {
		type: [
			{
				nature: {
					type: String,
					required: true
				},

				quantity: {
					type: String,
					required: true
				},

				location: {
					type: String,
					required: true
				},

				date: {
					type: Date,
					required: true
				},

				collected_from: {
					type: String,
					required: true
				},

				collected_by: {
					type: String,
					required: true
				},

				sent_to_magistrate: {
					type: Boolean,
					required: true,
					default: false
				}
			}
		]
	},

	witness: {
		type: [
			{
				name: {
					type: String,
					required: true
				},

				address: {
					type: String,
					required: true
				}
			}
		]
	},

	accusation: {
		type: String,
		required: true
	},

	crime: {
		type: String,
		required: true
	},

	dhara_of_accusation: {
		type: String,
		required: true
	},

	description: {
		type: String,
		required: true
	},

	primary_documents: {
		type: [String],
		required: true
	},

	optional_documents: {
		type: [String],
		default: []
	}
});

const investigationReport = database.model('Investigation Report', irSchema);

module.exports = investigationReport;
