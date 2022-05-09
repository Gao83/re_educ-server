const router = require("express").Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require("../models/User.model")
const saltRounds = 10
const { isAuthenticated } = require("../middlewares/jwt.middleware")

router.post('/register', (req, res, next) => {

    const { role, username, email, password } = req.body

    if (password.length < 2) {
        res.status(400).json({ message: 'Password must have at least 3 characters' })
        return
    }
    User
        .findOne({ email })
        .then((foundUser) => {

            if (foundUser) {
                res.status(400).json({ message: "User already exists." })
                return
            }

            const salt = bcrypt.genSaltSync(saltRounds)
            const hashedPassword = bcrypt.hashSync(password, salt)

            return User.create({ role, username, email, password })
        })
        .then((createdUser) => {
            const { role, username, email, password } = createdUser
            const user = { role, username, email, password }

            res.status(201).json({ user })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "Internal Server Error" })
        })
})


router.get('/verify', isAuthenticated, (req, res, next) => {
    res.status(200).json(req.payload)
})


module.exports = router
