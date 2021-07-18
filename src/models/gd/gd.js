const database = require('../../utils/database/database');
const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const gdSchema = new mongoose.Schema(
	{
		topic: {
			type: String,
			required: true
		},

		title: {
			type: String,
			required: true
		},

		description: {
			type: String,
			required: true
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
							validator: function(v) {
								return /((0088)|(\+88))?[0-9]{11}/.test(v);
							},

							message: props => `${props.value} is invalid nid format`
						}
					},

					nid: {
						type: String,
						required: true,
						validate: {
							validator: function(v) {
								return /([0-9]{10})/.test(v);
							},

							message: props => `${props.value} is invalid nid format`
						}
					},

					father_name: {
						type: String,
						required: true
					},

					date_of_birth: {
						type: Date,
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
							validator: function(v) {
								return /((0088)|(\+88))?[0-9]{11}/.test(v);
							},

							message: props => `${props.value} is invalid phone number format`
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

		thana: {
			type: Schema.Types.ObjectId,
			ref: 'Thana'
		},

		date: {
			type: Date,
			required: true,
			default: Date.now
		},

		status: {
			type: String,
			required: true,
			enum: ['unresolved', 'investigating', 'resolved', 'escalated'],
			default: 'unresolved'
		},

		primary_documents: {
			type: [String],
			required: true
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

gdSchema.virtual('assigned_officers.officer', {
	ref: 'Officer',
	localField: 'assigned_officers.id',
	foreignField: '_id',
	justOne: true
});

const gd = database.model('General Diary', gdSchema);

module.exports = gd;
