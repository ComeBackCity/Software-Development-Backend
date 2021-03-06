const express = require('express');
const router = new express.Router();
const multer = require('multer');
const { Storage } = require('@google-cloud/storage');
const path = require('path');

const image_max_size = 5 * 1024 * 1024;
const pdf_max_size = 10 * 1024 * 1024;

const imageTypes = ['image/jpeg', 'image/jpg', 'image/png'];
const docTypes = ['application/pdf'];
const audioTypes = ['audio/basic', 'audio/mid', 'audio/mpeg', 'audio/mp4'];
const videoTypes = ['video/x-flv', 'video/mp4'];

const fileFilterImage = (req, file, cb) => {
	if (!imageTypes.includes(file.mimetype)) {
		const error = new Error('Only jpeg, jpg and png images are allowed.');
		error.code = 'INCORRECT_FILETYPE';

		return cb(error, false);
	}

	return cb(null, true);
};

const fileFilterDocument = (req, file, cb) => {
	if (!docTypes.includes(file.mimetype)) {
		const error = new Error('Only pdf is allowed.');
		error.code = 'INCORRECT_FILETYPE';

		return cb(error, false);
	}

	return cb(null, true);
};

const uploadImage = multer({
	storage: multer.memoryStorage(),
	fileFilter: fileFilterImage,
	limits: {
		fileSize: image_max_size
	}
});

const uploadDocument = multer({
	storage: multer.memoryStorage(),
	fileFilter: fileFilterDocument,
	limits: {
		fileSize: pdf_max_size
	}
});

const storage = new Storage({
	keyFilename: path.join(__dirname, '../../../google-credentials.json'),
	projectId: 'cse408project-310914'
});

const bucketName = 'cse408project-310914.appspot.com';
const bucket = storage.bucket(bucketName);

const baseURL = 'https://storage.googleapis.com/cse408project-310914.appspot.com/';

const getRandomName = name => {
	return (
		new Date().getTime().toString() +
		Math.ceil(Math.random() * 10000000 + 11234543).toString() +
		'.' +
		name.split('.').pop()
	);
};

const uploadAnImage = async (image, dirName) => {
	const name = getRandomName(image.originalname);
	const cloudStorageFileName = dirName + '/' + name;
	const file = bucket.file(cloudStorageFileName);

	try {
		await file.createWriteStream({ resemble: false }).end(image.buffer);
		// console.log("done")
		return {
			name,
			link: baseURL + cloudStorageFileName
		};
		//return cloudStorageFileName
	} catch (e) {
		throw new Error('Can not upload');
	}
};

const uploadADocument = async (document, dirName) => {
	const name = getRandomName(document.originalname);
	const cloudStorageFileName = dirName + '/' + name;
	const file = bucket.file(cloudStorageFileName);

	try {
		await file.createWriteStream({ resemble: false }).end(document.buffer);
		//console.log("done")
		return {
			name,
			link: baseURL + cloudStorageFileName
		};
		//return cloudStorageFileName
	} catch (e) {
		throw new Error('Cannot upload');
	}
};

router.post('/upload/document', uploadDocument.single('document'), async (req, res) => {
	try {
		const dirName = req.query.directory;
		let document = await uploadADocument(req.file, dirName);
		res.send(document);
	} catch (e) {
		res.status(400).send('Cannot upload document');
	}
});

router.post('/upload/image', uploadImage.single('image'), async (req, res) => {
	try {
		const dirName = req.query.directory;
		let image = await uploadAnImage(req.file, dirName);
		res.send(image);
	} catch (e) {
		res.status(400).send('Cannot upload image');
	}
});

router.post('/upload/images', uploadImage.array('images'), async (req, res) => {
	try {
		const dirName = req.query.directory;
		let images = [];
		for (let i = 0; i < req.files.length; i++) {
			let image = await uploadAnImage(req.files[i], dirName);
			images.push(image.link);
		}
		return res.send({ images });
	} catch (e) {
		return res.status(400).send('Cannot upload images');
	}
});

router.post('/upload/documents', uploadDocument.array('documents'), async (req, res) => {
	try {
		const dirName = req.query.directory;
		let documents = [];
		for (let i = 0; i < req.files.length; i++) {
			let document = await uploadADocument(req.files[i], dirName);
			documents.push(document.link);
		}
		return res.send({ documents });
	} catch (e) {
		return res.status(400).send('Cannot upload documents');
	}
});

module.exports = router;
