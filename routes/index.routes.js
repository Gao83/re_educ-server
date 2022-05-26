const router = require("express").Router()

router.get("/", (req, res, next) => {
  res.json("All good in here")
})

router.use("/auth", require('./auth.routes'))
router.use('/courses', require('./course.routes'))
router.use('/profile', require('./user.routes'))
router.use('/rating', require('./rating.routes'))
router.use('/upload', require('./upload.routes'))
router.use('/response', require('./response.routes'))
router.use('/payment', require('./payment.routes'))
router.use('/notes', require('./notes.routes'))
router.use('/', require('./pay.routes'))
module.exports = router;
