const router = require("express").Router();
const User = require('../models/User.model')
const mongoose = require('mongoose')
const { isAuthenticated } = require("../middlewares/jwt.middleware")

//RUTAS TESTEADAS Y FUNCIONAN


//Todos los usuarios
router.get("/list", (req, res, next) => {

    User
        .find()
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


//LIST STUDENT
router.get("/student", (req, res, next) => {

    User
        .find({ role: 'USER' })
        .then(allStudents => res.json(allStudents))
        .catch(err => res.status(500).json(err))
})

//LIST TEACHER
router.get("/teacher", (req, res, next) => {

    User
        .find({ role: 'TEACHER' })
        .then(allTeachers => res.json(allTeachers))
        .catch(err => res.status(500).json(err))
})


//USER DETAILS
router.get("/:id", (req, res, next) => {

    const { id } = req.params

    User
        .findById(id)
        .then(oneUser => res.json(oneUser))
        .catch(err => res.status(500).json(err))
})

//EDIT USER
router.post("/edit/:id", isAuthenticated, (req, res, next) => {

    const { id } = req.params
    const userInfo = { username, email, password, profileImg, interests, education, aboutMe, courses } = req.body

    User
        .findByIdAndUpdate(id, userInfo )
        .then(editedUser => res.json(editedUser))
        .catch(err => res.status(500).json(err))
})

//DELETE USER
router.post('/delete/:id', isAuthenticated, (req, res, next) => {

    const { id } = req.params

    User
        .findByIdAndDelete(id)
        .then(() => {
            res.status(201).json('Estudiante borrado')
        })
        .catch(err => console.log(err))
})

module.exports = router
