const router = require('express').Router()
const Course = require('../models/Course.model')
const mongoose = require('mongoose')
const { formatError } = require('../utils/mongoose-error')

router.post('/create', (req, res, next) => {
    const { title, courseImg, headline, description, requirements, content, duration, isPaid, price, category, urls } = req.body

    Course
        .create({ title, courseImg, headline, description, requirements, content, duration, isPaid, price, category, urls })
        .then(newCourse => {
            res.status(201).json(newCourse)
        })
        .catch(error => {
            error instanceof mongoose.Error.ValidationError ? res.json({ errorMessage: formatError(error) }) : next(error)
        })
})

router.get('/getAllCourses', (req, res, next) => {
    Course
        .find()
        .then(allCourses => {
            res.status(201).json(allCourses)
        })
        .catch(err => err)
})

router.get('/getOneCourse/:id', (req, res, next) => {
    const { id } = req.params
    Course
        .findById(id)
        .then(oneCourse => {
            res.status(201).json(oneCourse)
        })
        .catch(err => err)
})

router.post('/edit/:id', (req, res, next) => {

    const { id } = req.params
    const { title, courseImg, headline, description, requirements, content, duration, isPaid, price, category, urls } = req.body

    Course
        .findByIdAndUpdate(id, { title, courseImg, headline, description, requirements, content, duration, isPaid, price, category, urls })
        .then(editCourse => {
            res.json(editCourse)
        })
        .catch(err => err)
})
module.exports = router