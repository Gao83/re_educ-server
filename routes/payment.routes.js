const router = require("express").Router();
const Payment = require('../models/Payment.model')
const { isAuthenticated } = require("../middlewares/jwt.middleware")


router.post('/create', isAuthenticated, (req, res, next) => {
   
    const currentUser = req.payload._id
    const { user, course, amount } = req.body
    Payment
        .create({ user: currentUser, course, amount })
        .then(newPayload => {
            res.status(201).json(newPayload)
        })
        .catch(err => res.status(500).json(err))
})


module.exports = router