const router = require("express").Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require("../models/User.model")
const saltRounds = 10
const { isAuthenticated } = require("../middlewares/jwt.middleware")

router.post('/register', (req, res) => {

    if (email === '' || password === '' || username === '') {
        res.status(400).json({ message: "Introduce e-mail, username y contraseña." })
        return
    }
    const { role, username, email, password } = req.body
    if (password.length < 2) {
        res.status(400).json({ message: 'La contraseña debe tener al menos 3 carácteres' })
        return
    }

    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
    // if (!emailRegex.test(email)) {
    //     res.status(400).json({ message: 'Introduce un correo electrónico válido.' })
    //     return
    // }

    User
        .findOne({ email })
        .then((foundUser) => {
            if (foundUser) {
                res.status(400).json({ message: "User already exists." })
                return
            }
            const salt = bcrypt.genSaltSync(saltRounds)
            const hashedPassword = bcrypt.hashSync(password, salt)
            return User.create({ role, username, email, password: hashedPassword })
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

router.post('/login', (req, res) => {

    const {_id, email, password, role } = req.body
    if (email === '' || password === '') {
        res.status(400).json({ message: "Indica email y contraseña." });
        return;
    }
    User
        .findOne({ email })
        .then((foundUser) => {
            if (!foundUser) {
                res.status(401).json({ message: "Usuario no encontrado" })
                return;
            }
            if (bcrypt.compareSync(password, foundUser.password)) {
                const { email, username, _id, role } = foundUser

                const payload = {_id, email, username, role }

                const authToken = jwt.sign(
                    payload,
                    process.env.TOKEN_SECRET,
                    { algorithm: 'HS256', expiresIn: "6h" }
                )
                res.status(200).json({ authToken });
            }
            else {
                res.status(401).json({ message: "No se ha podido autentificar al usuario" });
            }
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