const router = require("express").Router();
const Notes = require('../models/Notes.model')
const User = require("../models/User.model");
const { isAuthenticated } = require("../middlewares/jwt.middleware");
const Course = require("../models/Course.model");


router.post('/:course_id/createNotes', isAuthenticated, (req, res, next) => {

    const { course_id } = req.params
    const currentUser = req.payload._id
    const { content, owner, course, title } = req.body

    Notes
        .create({ content, title, owner: currentUser, course: course_id })
        .then(newCourse => {
            res.json(newCourse)
        })
        .catch(err => res.status(500).json(err))

})

router.get('/:course_id/getMyNotesByCourse', isAuthenticated, (req, res, next) => {
    const { course_id } = req.params

    const currentUser = req.payload._id

    Notes
        .find({ owner: currentUser, course: course_id })
        .then(notes => {
            res.json(notes)
        })
        .catch(err => res.status(500).json(err))

})



router.put('/:notes_id/delete', isAuthenticated, (req, res, next) => {


    const { notes_id } = req.params

    Notes
        .findByIdAndDelete(notes_id)
        .then(deleteNote => {
            res.json(deleteNote)
        })
        .catch(err => res.status(500).json(err))

})

module.exports = router