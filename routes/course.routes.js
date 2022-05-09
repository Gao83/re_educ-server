const router = require('express').Router()
const Course = require('../models/Course.model')

router.post('/create', (req, res, next) => {
    const { title, courseImg, head, headline, description, requirements, content, duration, date, isPaid, price, price_detail, category } = req.body


})

module.exports = router