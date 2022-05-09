const router = require("express").Router()


router.get("/", (req, res, next) => {
  res.json("All good in here")
})

router.use("/auth", require('./auth.routes'))
router.use('/courses', require('./course.routes'))
router.use('/profile', require('./profile.routes'))


module.exports = router;
