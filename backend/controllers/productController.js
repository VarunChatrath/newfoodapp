const productController = require('express').Router()
const Product = require('../models/Product')
const { verifyToken, verifyTokenAdmin } = require('../middlewares/verifyToken')

// get All

productController.get("/", verifyToken, async (req, res) => {
    try {
        const products = await Product.find(req.query)
        return res.status(200).json(products)
    } catch (error) {
        console.log(error)
    }
})

// get One

productController.get("/find/:id", verifyToken, async (req, res) => {
    try {
        const products = await Product.findById(req.params.id)
        if (!products) {
            return res.status(500).json({ msg: 'No product found' })
        }
        return res.status(200).json(products)
    } catch (error) {
        console.log(error)
    }
})

// create product

productController.post("/", verifyTokenAdmin, async (req, res) => {
    try {
        const newProducts = await Product.create({ ...req.body })

        return res.status(500).json(newProducts)

    } catch (error) {
        console.log(error)
    }
})

module.exports = productController
