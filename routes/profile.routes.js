const router = require("express").Router();
const User = require('./../models/User.model')
const mongoose = require('mongoose')
const { isAuthenticated } = require("../middlewares/jwt.middleware")


//ALL USERS
router.get("/list", (req, res, next) => {

    User
        .find()
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

//CRUD STUDENT
router.get("/student", (req, res, next) => {

    User
        .find({ role: 'USER' })
        .then(allStudents => res.json(allStudents))
        .catch(err => res.status(500).json(err))
})

router.get("/student/:id", (req, res) => {

    const { id } = req.params

    User
        .findById(id)
        .then(oneStudent => res.json(oneStudent))
        .catch(err => res.status(500).json(err))
})

router.post("/student/edit/:id", isAuthenticated, (req, res) => {

    const { id } = req.params
    const studentInfo = { username, email, password, profileImg, interests, education, aboutMe, courses } = req.body
    // const studentInfo = { username, email, password, profileImg, interests, education, aboutMe, courses }

    User
        .findByIdAndUpdate(id, { studentInfo })
        .then(editedStudent => res.json(editedStudent))
        .catch(err => res.status(500).json(err))
})

router.post('/student/delete/:id', isAuthenticated, (req, res) => {

    const { id } = req.params

    User
        .findByIdAndDelete(id)
        .then(() => {
            res.status(201).json('Student deleted')
        })
        .catch(err => console.log(err))
})

//CRUD TEACHER
router.get("/teacher", (req, res) => {

    User
        .find({ role: 'TEACHER' })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.get("/teacher/:id", (req, res) => {

    const { id } = req.params

    User
        .findById(id)
        .then(oneTeacher => res.json(oneTeacher))
        .catch(err => res.status(500).json(err))
})

router.post("/teacher/edit/:id", isAuthenticated, (req, res) => {

    const { id } = req.params
    const { username, email, password, profileImg, interests, education, aboutMe, courses } = req.body
    const teacherInfo = { username, email, password, profileImg, interests, education, aboutMe, courses }

    User
        .findByIdAndUpdate(id, { teacherInfo })
        .then(editedTeacher => res.json(editedTeacher))
        .catch(err => res.status(500).json(err))
})

router.post('/teacher/delete/:id', isAuthenticated, (req, res, next) => {

    const { id } = req.params

    User
        .findByIdAndDelete(id)
        .then(() => {
            res.status(201).json('Teacher deleted')
        })
        .catch(err => next(err))
})

module.exports = router
