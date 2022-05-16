const router = require("express").Router();
const User = require('../models/User.model')
const mongoose = require('mongoose')
const { isAuthenticated } = require("../middlewares/jwt.middleware");
const Rating = require("../models/Rating.model");

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
router.get("/details/:id", (req, res) => {

    const { id } = req.params

    User
        .findById(id)
        .then(oneUser => res.json(oneUser))
        .catch(err => res.status(500).json(err))
})

//EDIT USER
router.post("/edit/:id", isAuthenticated, (req, res) => {

    const { id } = req.params
    const userInfo = { interests, education, aboutMe, profileImg } = req.body

    User
        .findByIdAndUpdate(id, userInfo)
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


//GET TEACHER BY RATING
router.get('/getRatingsTeacher/:id', (req, res, next) => {

    const { id } = req.params
    const promiseRating = Rating.find({ teacher: id })
    const promiseUser = User.findById(id)
    Promise
    .all([promiseRating, promiseUser])
    .then(([allRating, oneUser,]) => {
        let valueRating = allRating.map(item => item.rating)
        let sum = 0
        valueRating.forEach(item => item != null ? sum += item : 0)
        let result = sum / allRating.length
        let avgRating = result.toFixed(1)
        let ratingTeacher = { ...oneUser._doc, avgRating }
        console.log('-------------------', ratingTeacher)
            // finalCourse.isPaid ? res.status(401).json({ message: 'No estás autorizado/a' }) :
            res.status(201).json(ratingTeacher)
        }
        )
        .catch(err => res.status(500).json(err))
})


module.exports = router
