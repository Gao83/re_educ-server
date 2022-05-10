const router = require("express").Router();
const Rating = require('./../models/Rating.model')
const { isAuthenticated } = require("../middlewares/jwt.middleware")


// COMENTARIO EN EL CURSO
router.post('/course/:course/create-comment', isAuthenticated, (req, res) => {

    const { image, content, rating } = req.body
    const currentUser = req.payload._id
    
    console.log('----------------------', currentUser)
    const { course } = req.params

    Rating
        .create({ owner: currentUser, course, image, content, rating })
        .then(review => {
            res.json(review)
        })
        .catch(err => res.status(500).json(err))
})

// COMENTARIO EN EL PERFIL DEL PROFESOR
router.post('/teacher/:teacher/create-comment', isAuthenticated, (req, res) => {

    const { image, content, rating } = req.body
    const currentUser = req.payload._id
    console.log('----------------------', currentUser)
    const { teacher } = req.params

    Rating
        .create({ owner: currentUser, teacher, image, content, rating })
        .then(review => {
            res.json(review)
        })
        .catch(err => res.status(500).json(err))
})

module.exports = router
