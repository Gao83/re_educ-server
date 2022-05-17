const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema(
    {
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        course: [{
            type: Schema.Types.ObjectId,
            ref: 'Course'
        }],
    },
    {
        timestamps: true,
    }
)

const Cart = mongoose.model('Cart', cartSchema)
module.exports = Cart