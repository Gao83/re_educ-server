const router = require("express").Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require("../models/User.model")

router.post('/login', (req, res, next) => {

    const { email, password } = req.body

    if (email === '' || password === '') {
        res.status(400).json({ message: "Indica email y contraseña." });
        return;
    }

    User

        .findOne({ email })
        .then((foundUser) => {

        //     if (!foundUser) {
        //         res.status(401).json({ message: "Usuario no encontrado" })
        //         return;
        //     }

        //     if (bcrypt.compareSync(password, foundUser.password)) {

        //         const { _id, email, username } = foundUser

        //         const payload = { _id, email, username }

        //         const authToken = jwt.sign(
        //             payload,
        //             process.env.TOKEN_SECRET,
        //             { algorithm: 'HS256', expiresIn: "6h" }
        //         )

        //         res.status(200).json({ authToken });
        //     }
        //     else {
        //         res.status(401).json({ message: "No se ha podido autentificar al usuario" });
        //     }
            
            
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

module.exports = router;
