const router = require("express").Router();
const Response = require('./../models/Response.model')
const { isAuthenticated } = require("../middlewares/jwt.middleware")


// RESPUESTA SOBRE COMENTARIO EN EL CURSO
router.post('/course/:comment/response', isAuthenticated, (req, res) => {

    const { image, content } = req.body
    const currentUser = req.payload._id

    console.log('----------------------', currentUser)
    const currentComment = req.params._id
    console.log('EL COMENTARIO EN CUESTIÓN', currentComment)

    Response
        .create({ owner: currentUser, comment: currentComment, image, content })
        .then(review => {
            res.json(review)
        })
        .catch(err => res.status(500).json(err))
})

// RESPUESTA SOBRE COMENTARIO EN EL PERFIL DEL PROFESOR
router.post('/teacher/:comment/response', isAuthenticated, (req, res) => {

    const { image, content } = req.body
    const currentUser = req.payload._id

    console.log('----------------------', currentUser)
    const currentComment = req.params._id
    console.log('EL COMENTARIO EN CUESTIÓN', currentComment)

    Response
        .create({ owner: currentUser, comment: currentComment, image, content })
        .then(review => {
            res.json(review)
        })
        .catch(err => res.status(500).json(err))
})


module.exports = router

