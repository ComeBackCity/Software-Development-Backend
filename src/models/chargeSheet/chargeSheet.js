const database = require('../../utils/database/database');
const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const csSchema = mongoose.Schema({
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
		type: {
			name: {
				type: String,
				required: true
			},

			address: {
				type: String,
				required: true
			},

			phone_no: {
				type: String,
				required: true,
				validate: {
					validator: function (v) {
						return /((0088)|(\+88))?[0-9]{11}/.test(v);
					},

					message: props => `${props.value} is invalid phone number format`
				}
			},

			nid: {
				type: String,
				required: true,
				validate: {
					validator: function (v) {
						return /([0-9]{10})/.test(v);
					},

					message: props => `${props.value} is invalid nid format`
				}
			}
		},

		required: true
	},

	acquired_items: {
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
				},

				phone_no: {
					type: String,
					required: true,
					validate: {
						validator: function (v) {
							return /((0088)|(\+88))?[0-9]{11}/.test(v);
						},

						message: props => `${props.value} is invalid phone number format`
					}
				},

				nid: {
					type: String,
					required: true,
					validate: {
						validator: function (v) {
							return /([0-9]{10})/.test(v);
						},

						message: props => `${props.value} is invalid nid format`
					}
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

const chargeSheet = database.model('Charge Sheet', csSchema);

module.exports = chargeSheet;
