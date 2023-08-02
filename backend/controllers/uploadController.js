const uploadController = require('express').Router()


const multer = require('multer')
const { verifyToken } = require('../middlewares/verifyToken')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, req.body.filename)
    }
})

const upload = multer({
    storage
})

uploadController.post('/image', verifyToken, upload.single('image'), (req, res) => {
    try {
        res.status(201).json('Successfully Uploaded file')
    } catch (error) {
        console.log(error.message)
    }
})

module.exports = uploadController