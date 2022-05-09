const router = require("express").Router()

router.get("/", (req, res, next) => {
  res.json("All good in here")
})

router.use("/auth", require('./auth.routes'))

module.exports = router
router.use('/courses', require('./course.routes'))
module.exports = router;
