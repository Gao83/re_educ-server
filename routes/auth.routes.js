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
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "Internal Server Error" })
        })
})

module.exports = router;
