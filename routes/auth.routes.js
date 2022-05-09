const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require("../models/User.model")

router.post('/register', (req, res, next) => {

    const { firstName, lastName, email, password, profileImg, interests } = req.body

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

            return User.create({
                firstName, lastName, email, password: hashedPassword, profileImg, interests
            })
        })
        .then((createdUser) => {
            console.log('----', createdUser)
            const { firstName, lastName, email, password, profileImg, interests } = createdUser
            const user = {firstName, lastName, email, password, profileImg, interests}

            res.status(201).json({ user })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "Internal Server Error" })
        })

})

module.exports = router