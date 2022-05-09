const router = require('express').Router()
const Course = require('../models/Course.model')
const mongoose = require('mongoose')
const { formatError } = require('../utils/mongoose-error')

router.post('/create', (req, res, next) => {
    const { title, courseImg, headline, description, requirements, content, duration, isPaid, price, category, urls } = req.body
    Course
        .findOne({ title })
        .then(findCourse => {
            if (findCourse) {
                res.status(400).json({ message: 'The course is already exist' })
                return
            }
            return Course.create({ title, courseImg, headline, description, requirements, content, duration, isPaid, price, category, urls })
        })
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
        .catch(error => {
            error instanceof mongoose.Error.ValidationError ? res.json({ errorMessage: formatError(error) }) : next(error)
        })
})



router.post('/delete/:id', (req, res, next) => {

    const { id } = req.params

    Course
        .findByIdAndDelete(id)
        .then(() => {
            res.json({ message: 'has borrado un curso' })
        })
        .catch(err => res.status(500).json(err))
})


router.get('/filter/:category', (req, res, next) => {
    const { category } = req.params
    Course
        .find({ category: category })
        .then(categoryGroups => {
            res.status(201).json(categoryGroups)
        })
        .catch(err => res.status(500).json(err))
})

router.get('/filter-courses/:search', (req, res, next) => {
    const { search } = req.params
    Course
        .find({ 'title': { "$regex": search, "$options": "i" } })
        .then(filteredCourses => res.json(filteredCourses))
        .catch(err => res.status(500).json(err))
})

// router.get('/filter-paid/courses?isPaid', (req, res, next) => {
//     const { isPaid } = req.query
//     Course
//         .find({ isPaid: isPaid })
//         .then(filteredCourses => res.json(filteredCourses))
//         .catch(err => res.status(500).json(err))
// })


module.exports = router
