const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const app = express()
const authController = require('./controllers/authController')
const productController = require('./controllers/productController')
const uploadController = require('./controllers/uploadController')
const NewsLetter = require('./models/NewsLetter')
const newsLetterController = require('./controllers/newsLetterController')
const path = require('path')

dotenv.config();

// connect our db
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect("mongodb+srv://varun:2001Varun@cluster0.lyl0ehm.mongodb.net/?retryWrites=true&w=majority");
    console.log("DB is connected Succesfully")
}

// routes & middlewares
// These 2 middlewares make req.body accessible otherwise it would be undefined
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/images', express.static('public/images'))
app.use('/auth', authController)
app.use('/product', productController)
app.use('/upload', uploadController)
app.use('/newsLetter', newsLetterController)



// start our server
app.listen(process.env.PORT, () => console.log("Server has been started Successfully"))