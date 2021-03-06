const router = require("express").Router();
const Rating = require('./../models/Rating.model')
const Course = require('./../models/Course.model')
const { isAuthenticated } = require("../middlewares/jwt.middleware")


//ALL COMMENTS FILTERED BY COURSE

router.get("/comments/:course_id", (req, res, next) => {

    const { course_id } = req.params

    Rating
        .find({ course: course_id })
        .populate('owner')
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

//ALL COMMENTS FILTERED BY TEACHER

router.get("/comments/teacher/:teacher", (req, res, next) => {

    const { teacher } = req.params

    Rating
        .find({ teacher })
        .populate('owner')
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

// USER COMMENT COURSE
router.post('/course/:course/create-comment', isAuthenticated, (req, res) => {

    const { image, content, rating } = req.body
    const currentUser = req.payload._id

    const { course } = req.params

    Rating
        .create({ owner: currentUser, course, image, content, rating })
        .then(review => {
            res.json(review)
        })
        .catch(err => res.status(500).json(err))
})


// USER COMMENT TEACHER
router.post('/teacher/:id/create-comment', isAuthenticated, (req, res) => {

    const { image, content, rating } = req.body
    const currentUser = req.payload._id

    const { id } = req.params

    Rating
        .create({ image, content, rating, owner: currentUser, teacher: id })
        .then(review => {
            res.json(review)
        })
        .catch(err => res.status(500).json(err))
})


router.post('/course/:course/create-comment', isAuthenticated, (req, res) => {

    const { image, content, rating } = req.body
    const currentUser = req.payload._id

    const { course_id } = req.params

    Rating
        .create({ owner: currentUser, course_id, image, content, rating })
        .then(review => {
            res.json(review)
        })
        .catch(err => res.status(500).json(err))
})


// EDIT  USER COMMENT
router.post('/course/edit-comment/:id', (req, res, next) => {

    const { id } = req.params
    const { image, content, rating } = req.body

    Rating
        .findByIdAndUpdate(id, { image, content, rating })
        .then(editComment => {
            // console.log('esto es el comentario DEL USER editado-------', editComment )
            res.json(editComment)
        })
        .catch(error => {
            error instanceof mongoose.Error.ValidationError ? res.json({ errorMessage: formatError(error) }) : next(error)
        })

})

//DELETE USER COMMENT
router.post('/course/delete/:id', (req, res, next) => {

    const { id } = req.params

    Rating
        .findByIdAndDelete(id)
        .then(() => {
            res.json({ message: 'Has borrado un comentario del curso' })
        })
        .catch(err => res.status(500).json(err))
})


// TEACHER COMMENT
router.post('/teacher/:teacher/create-comment', isAuthenticated, (req, res) => {

    const { image, content, rating } = req.body
    const currentUser = req.payload._id

    const { teacher } = req.params

    Rating
        .create({ owner: currentUser, teacher, image, content, rating })
        .then(review => {
            res.json(review)
        })
        .catch(err => res.status(500).json(err))
})


// EDIT TEACHER COMMENT
router.post('/teacher/edit-comment/:id', (req, res, next) => {

    const { id } = req.params
    const { image, content, rating } = req.body

    Rating
        .findByIdAndUpdate(id, { image, content, rating })
        .then(editComment => {
            // console.log('esto es el comentario DEL TEACHER editado-------', editComment)
            res.json(editComment)
        })
        .catch(error => {
            error instanceof mongoose.Error.ValidationError ? res.json({ errorMessage: formatError(error) }) : next(error)
        })

})

//DELETE TEACHER COMMENT
router.post('/teacher/delete/:id', (req, res, next) => {

    const { id } = req.params

    Rating
        .findByIdAndDelete(id)
        .then(() => {
            res.json({ message: 'Has borrado un comentario del profesor' })
        })
        .catch(err => res.status(500).json(err))
})






module.exports = router
