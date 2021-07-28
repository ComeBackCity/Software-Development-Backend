const caseModel = require('../../models/cases/case');
const thanaModel = require('../../models/misc/thana');
const status_codes = require('../../utils/status_codes');

const masterQuery = async (req, res) => {
	let divisions = [],
		districts = [],
		thanas = [];

	await thanaModel
		.find()
		.distinct('division')
		.then(r => {
			divisions = r;
		});

	await thanaModel
		.aggregate([
			{
				$group: {
					_id: {
						division: '$division',
						district: '$district'
					}
				}
			}
		])
		.then(r => {
			districts = r;
		});

	await thanaModel
		.aggregate([
			{
				$group: {
					_id: {
						division: '$division',
						district: '$district',
						thana: '$thana'
					}
				}
			}
		])
		.then(r => {
			thanas = r;
		});

	let data01 = [],
		data02 = [],
		data03 = [];

	for (const division of divisions) {
		await caseModel
			.aggregate([
				{
					$lookup: {
						from: 'thanas',
						localField: 'thana',
						foreignField: '_id',
						as: 'thana'
					}
				},
				{
					$unwind: '$thana'
				},
				{
					$match: {
						'thana.division': division
					}
				},
				{
					$group: {
						_id: '$topic',
						count: {
							$sum: 1
						}
					}
				}
			])
			.then(r => {
				let total = 0;
				r.map(item => {
					total += item.count;
				});
				data01.push({
					division,
					total_crime_count: total,
					crime_wise: r
				});
			})
			.catch(err => {
				return res.status(status_codes.DATA_NOT_FOUND).json({
					error: err.message
				});
			});
	}

	for (const district of districts) {
		await caseModel
			.aggregate([
				{
					$lookup: {
						from: 'thanas',
						localField: 'thana',
						foreignField: '_id',
						as: 'thana'
					}
				},
				{
					$unwind: '$thana'
				},
				{
					$match: {
						'thana.district': district._id.district
					}
				},
				{
					$group: {
						_id: '$topic',
						count: {
							$sum: 1
						}
					}
				}
			])
			.then(r => {
				let total = 0;
				r.map(item => {
					total += item.count;
				});
				data02.push({
					division: district._id.division,
					district: district._id.district,
					total_crime_count: total,
					crime_wise: r
				});
			})
			.catch(err => {
				return res.status(status_codes.DATA_NOT_FOUND).json({
					error: err.message
				});
			});
	}

	for (const thana of thanas) {
		await caseModel
			.aggregate([
				{
					$lookup: {
						from: 'thanas',
						localField: 'thana',
						foreignField: '_id',
						as: 'thana'
					}
				},
				{
					$unwind: '$thana'
				},
				{
					$match: {
						'thana.thana': thana._id.thana
					}
				},
				{
					$group: {
						_id: '$topic',
						count: {
							$sum: 1
						}
					}
				}
			])
			.then(r => {
				let total = 0;
				r.map(item => {
					total += item.count;
				});
				data03.push({
					division: thana._id.division,
					district: thana._id.district,
					thana: thana._id.thana,
					total_crime_count: total,
					crime_wise: r
				});
			})
			.catch(err => {
				return res.status(status_codes.DATA_NOT_FOUND).json({
					error: err.message
				});
			});
	}

	try {
		return res.status(status_codes.SUCCESS).json({ data01, data02, data03 });
	} catch (e) {
		return res.status(status_codes.DATA_NOT_FOUND).json({
			error: e.message
		});
	}
};

module.exports = masterQuery;
