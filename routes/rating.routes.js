const router = require("express").Router();
const Rating = require('./../models/Rating.model')
const { isAuthenticated } = require("../middlewares/jwt.middleware")

router.post('/:course/create-comment', (req, res) => {

    const { image, content, rating } = req.body
    const currentUser = req.payload
    console.log('----------------------', currentUser)
    const { course } = req.params

    Rating
        .create({ owner: currentUser, course, image, content, rating })
        .then(review => {
            res.json(review)
        })
        .catch(err => res.status(500).json(err))
})

module.exports = router
