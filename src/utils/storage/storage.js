const express = require('express')
const router = new express.Router()
const multer = require('multer')
const {Storage} = require('@google-cloud/storage')
const path = require('path')

const image_max_size = 5 * 1024 * 1024

const imageTypes = ["image/jpeg", "image/jpg", "image/png"]
const docTypes = ["application/pdf"]
const audioTypes = ["audio/basic","audio/mid","audio/mpeg","audio/mp4"]
const videoTypes = ["video/x-flv","video/mp4"]

const fileFilter = (req, file, cb) => {
    if(!imageTypes.includes(file.mimetype)){
        const error = new Error("Only jpeg, jpg and png images are allowed.")
        error.code = "INCORRECT_FILETYPE"

        return cb(error, false)
    }

    return cb(null, true)
}

const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter,
    limits: {
        fileSize: image_max_size
    }
})

const storage = new Storage({
    keyFilename: path.join(__dirname, "../../../cse408project-310914-1c65fcc04e28.json"),
    projectId: 'cse408project-310914'
});

const bucketName = 'cse408project-310914.appspot.com';
const bucket = storage.bucket(bucketName);

const baseURL = "https://storage.googleapis.com/cse408project-310914.appspot.com/"

const getRandomName = (name) => {
    return new Date().getTime().toString() +
        Math.ceil(Math.random() * 10000000 + 11234543).toString() +
        "." + name.split('.').pop()
}

const uploadAnImage = async (image, dirName) => {
    const name = getRandomName(image.originalname)
    const cloudStorageFileName = dirName + "/"  + name
    const file = bucket.file(cloudStorageFileName);

    try {
        await file.createWriteStream({resemble: false}).end(image.buffer)
        //console.log("done")
        return {
            name,
            link: baseURL + cloudStorageFileName,
        }
        //return cloudStorageFileName
    }catch(e) {
        throw new Error("Can not upload")
    }
}

router.post('/upload/image', upload.single('image'), async (req, res) => {
    try {
        let image = await uploadAnImage(req.file, "photos")
        //console.log("send")
        res.send(image)
    }catch (e) {
        res.status(400).send("Can not upload image")
    }
})

module.exports = router
