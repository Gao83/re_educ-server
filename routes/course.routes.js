const router = require('express').Router()
const Course = require('../models/Course.model')
const Rating = require('../models/Rating.model')
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

// router.get('/getAllCourses', (req, res, next) => {
//     Course
//         .find()
//         .then(allCourses => {
//             res.status(201).json(allCourses)
//         })
//         .catch(err => err)
// })

router.get('/getAllCourses', (req, res, next) => {

    const promiseRating = Rating.find()
    const promiseCourse = Course.find()
    Rating
        .find()
        .then(allRatings => {
            let idRatingsCourse = allRatings.map(rating => rating.rating)

            res.json(idRatingsCourse)
            //return Promise.all(idRatingsCourse)

        })
    // .then(allCourses => {
    //     res.json(allCourses)
    // })

    // return Promise.all(promiseAllRatings)

})




router.delete('/:id/delete-user', (req, res) => {

    const { id } = req.params

    User
        .find({ friends: id })
        .then(users => {
            let promiseArr = users.map(user => User.findByIdAndUpdate(user._id, { $pull: { friends: id } }, { new: true }))
            return Promise.all(promiseArr)
        })
        .then(() => User.findByIdAndDelete(id, { new: true }))
        .then(response => res.json(response))
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


router.get('/getOneCourse/:id', (req, res, next) => {

    const { id } = req.params

    const promiseRating = Rating.find({ course: id })
    const promiseCourse = Course.findById(id)

    Promise
        .all([promiseRating, promiseCourse])
        .then(([allRating, oneCourse]) => {
            let valueRating = allRating.map(item => item.rating)
            let sum = 0
            valueRating.forEach(item => item != null ? sum += item : 0)

            let result = sum / allRating.length
            let finalRating = result.toFixed(1)
            let finalCourse = { ...oneCourse._doc, finalRating }
            finalCourse.isPaid ? res.status(401).json({ message: 'No estás autorizado/a' }) : res.status(201).json(finalCourse)

        }
        )
        .catch(err => res.status(500).json(err))
})



module.exports = router
