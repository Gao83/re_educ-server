const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PaymentSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        course: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        totalPrice: {
            type: Number
        },
    },
    {
        timestamps: true,
    }
)

const Payment = mongoose.model('Payment', paymentSchema)
module.exports = Payment