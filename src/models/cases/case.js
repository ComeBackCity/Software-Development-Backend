const database = require('../../utils/database/database');
const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const caseSchema = new mongoose.Schema(
	{
		_id: String,

		subject: {
			type: String,
			required: true
		},

		type: {
			type: String,
			required: true
		},

		topic: {
			type: String,
			required: true
		},

		assigned_officers: {
			type: [
				{
					id: {
						type: String,
						required: true
					},

					from: {
						type: Date,
						required: true,
						default: Date.now()
					},

					to: {
						type: Date,
						required: false
					},

					_id: false
				}
			]
		},

		status: {
			type: String,
			required: true,
			default: 'on_hold'
		},

		for: {
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

							message: props => `${props.value} is invalid nid format`
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
					},

					father_name: {
						type: String,
						required: true
					}
				}
			],

			required: true,

			validate: [
				val => {
					return val.length > 0;
				},
				'Minimum length is 1'
			]
		},

		against: {
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

							message: props => `${props.value} is invalid nid format`
						}
					},

					nid: {
						type: String,
						validate: {
							validator: function (v) {
								return /([0-9]{10})/.test(v);
							},

							message: props => `${props.value} is invalid nid format`
						}
					},

					father_name: {
						type: String,
						required: true
					}
				}
			],

			required: true,

			validate: [
				val => {
					return val.length > 0;
				},
				'Minimum length is 1'
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

							message: props => `${props.value} is invalid nid format`
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
					},

					father_name: {
						type: String,
						required: true
					},

					witness_statement: {
						type: String,
						required: true
					}
				}
			],

			default: []
		},

		relationship_between_parties: {
			type: String
		},

		damage: {
			type: Number
		},

		late_reason: {
			type: String
		},

		date: {
			type: Date,
			required: true,
			default: Date.now
		},

		verdict: {
			type: String
		},

		closed_date: {
			type: String
		},

		thana: {
			type: Schema.Types.ObjectId,
			ref: 'Thana'
		},

		description: {
			type: String,
			required: true
		},

		primary_documents: {
			type: [String],
			required: true
		},

		optional_images: {
			type: [String],
			default: []
		},

		optional_documents: {
			type: [String],
			default: []
		},

		links: {
			type: [
				{
					documentType: {
						type: String,
						required: true
					},

					id: {
						type: mongoose.Schema.Types.ObjectId,
						required: true
					},

					recordedBy: {
						type: mongoose.Schema.Types.ObjectId,
						required: true,
						ref: 'Officer'
					},

					recordedOn: {
						type: Date,
						required: true,
						default: Date.now
					}
				}
			]
		}
	},
	{
		toJSON: {
			virtuals: true
		}
	}
);

caseSchema.virtual('assigned_officers.officer', {
	ref: 'Officer',
	localField: 'assigned_officers.id',
	foreignField: '_id',
	justOne: true
});

const cases = database.model('Case', caseSchema);

module.exports = cases;
