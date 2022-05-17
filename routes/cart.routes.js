const router = require("express").Router();
const Cart = require('../models/Cart.model')
const { isAuthenticated } = require("../middlewares/jwt.middleware")

//create cart
router.post("/createCart", isAuthenticated, (req, res) => {

    const owner = req.payload._id

    Cart
        .create({ owner, course: [] })
        .then(newCart => res.json(newCart._id))
        .catch(err => res.status(500).json(err))
})

//add item
router.post("/addCourse/:id", isAuthenticated, (req, res) => {

    const { id } = req.params

    Cart
        .findById(id)
        .then(response => {
            response.course.forEach(item => {
                if (item.product == productId) {
                    item.quantity += parseInt(productQuantity)
                } else {
                    response.items.push({ product: productId, quantity: productQuantity })
                }
            });
            return response.save()
        })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

//update quantity
router.put("/updateQuantity", isAuthenticated, (req, res, next) => {

    const { cartId, productId, productQuantity } = req.body

    Cart
        .findById(cartId)
        .then(response => {
            response.items.forEach(item => {
                if (item.product == productId) {
                    item.quantity = productQuantity
                }
            });
            return response.save()
        })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

//deleteItem
router.delete("/deleteItem", isAuthenticated, (req, res, next) => {

    const { cartId, itemId } = req.body

    Cart
        .findById(cartId)
        .then(response => {
            response.items.forEach((item, idx) => {
                if (item._id == itemId) {
                    response.items.splice(idx, 1)
                }
            });
            return response.save()
        })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

//getAllItems
router.get("/getAllItems", isAuthenticated, (req, res, next) => {

    const { cartId } = req.body

    Cart
        .findById(cartId)
        .then(cart => {
            res.json(cart.items)
        })
        .catch(err => res.status(500).json(err))
})

module.exports = router