const router = require('express').Router()
const Course = require('../models/Course.model')
const Rating = require('../models/Rating.model')
const Payment = require("../models/Payment.model")
const User = require("../models/User.model")
const mongoose = require('mongoose')
const { formatError } = require('../utils/mongoose-error')
const { isAuthenticated } = require("../middlewares/jwt.middleware")
const { ratingCourses } = require('../utils/pushRatingListCourse')


router.post('/create', isAuthenticated, (req, res, next) => {

    const currentUser = req.payload._id
    const { title, courseImg, courseVideo, headline, description, requirements, content, duration, isPaid, price, category, urls } = req.body

    Course
        .findOne({ title })
        .then(findCourse => {
            if (findCourse) {
                res.status(400).json({ message: 'Este curso ya existe' })
                return
            }
            return Course.create({ title, owner: currentUser, courseImg, courseVideo, headline, description, requirements, content, duration, isPaid, price, category, urls })
        })
        .then(newCourse => {
            res.status(201).json(newCourse)
        })
        .catch(error => {
            error instanceof mongoose.Error.ValidationError ? res.json({ errorMessage: formatError(error) }) : next(error)
        })
})

router.get('/getAllCourses', (req, res, next) => {

    const promiseRating = Rating.find()
    const promiseCourse = Course.find()

    Promise
        .all([promiseCourse, promiseRating])
        .then(([courses, ratings]) => {

            res.json(ratingCourses(courses, ratings))

        })
        .catch(err => res.status(500).json(err))
})


router.get('/coursesOrderedByRating', (req, res, next) => {

    const promiseRating = Rating.find()
    const promiseCourse = Course.find()

    Promise
        .all([promiseCourse, promiseRating])
        .then(([courses, ratings]) => {

            const allCourses = ratingCourses(courses, ratings)
            const coursesOrdByRating = allCourses.sort((a, b) => {

                return b.avgRating - a.avgRating
            })

            res.json(coursesOrdByRating.slice(0, 6))

        })
        .catch(err => res.status(500).json(err))
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
            res.json({ message: 'Has borrado un curso' })
        })
        .catch(err => res.status(500).json(err))
})

router.get('/filter/:category', (req, res) => {

    const { category } = req.params

    Course
        .find({ category })
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


router.get('/getCoursesById/:id', (req, res, next) => {

    const { id } = req.params

    Course
        .find({ owner: id })
        .then(courses => res.json(courses))
        .catch(err => res.status(500).json(err))
})




router.get('/getOneCourse/:id', (req, res, next) => {

    const { id } = req.params
    const promiseRating = Rating.find({ course: id })
    const promiseCourse = Course.findById(id).populate('owner')
    Promise
        .all([promiseRating, promiseCourse])
        .then(([allRating, oneCourse,]) => {
            let valueRating = allRating.map(item => item.rating)
            let sum = 0

            valueRating.forEach(item => item != null ? sum += item : 0)


            let result = sum === 0 || allRating.length === 0 ? 1 : sum / allRating.length

            let avgRating = result.toFixed(1).replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/, '$1')

            let finalCourse = { ...oneCourse._doc, avgRating }
            // finalCourse.isPaid ? res.status(401).json({ message: 'No estás autorizado/a' }) :

            res.status(201).json(finalCourse)

        }
        )
        .catch(err => res.status(500).json(err))
})


router.get('/coursesListByUser', isAuthenticated, (req, res, next) => {

    const currentUser = req.payload._id

    Course
        .find({ owner: currentUser })
        .then(findCourse => {
            res.json(findCourse)
        })
        .catch(err => res.status(500).json(err))

})

router.get('/coursesCurrentUser', isAuthenticated, (req, res, next) => {

    const currentUser = req.payload._id
    const promisePayment = Payment.find({ user: currentUser })

    const promiseCourse = Course.find()
    Promise
        .all([promisePayment, promiseCourse])
        .then(([payments, courses]) => {


            const filterdCourses = []
            payments.forEach(eachPayment => {
                courses.forEach(eachCourse => {
                    if (eachCourse._id.toString() === eachPayment.course.toString()) {
                        filterdCourses.push(eachCourse)
                    }
                })
            })

            res.json(filterdCourses)
        })
        .catch(err => res.status(500).json(err))

})


module.exports = router