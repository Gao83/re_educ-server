const router = require("express").Router();
const User = require('./../models/User.model')

router.get("/list", (req, res) => {

    User
        .find()
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


router.get("/teacher", (req, res) => {

    User
        .find({role: 'TEACHER'})
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.get("/teacher/:id", (req, res) => {

    const { id } = req.params

    User
        .findById(id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


module.exports = router
