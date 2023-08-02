const newsLetterController = require('express').Router()
const jwt = require('jsonwebtoken')
const User = require('../models/NewsLetter')
const bcrypt = require('bcrypt')

// Taking email

newsLetterController.post('/usermail', async (req, res) => {
    try {
        const isExisting = await User.findOne({ email: req.body.email })
        if (isExisting) {
            throw new Error("User already subscribed")
        }

        const newUser = await User.create({ ...req.body })
        const { ...others } = newUser._doc
        const token = jwt.sign({ id: newUser._id, isAdmin: newUser.isAdmin }, process.env.JWT_SECRET, { expiresIn: "5h" })

        return res.status(201).json({ others, token })
    } catch (error) {
        res.status(500).json(error.message)
    }
})

module.exports = newsLetterController