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
            ref: 'Course'
        },
        amount: {
            type: Number,
            default: 0.0
        },
    },
    {
        timestamps: true,
    }
)

const Payment = mongoose.model('Payment', PaymentSchema)
module.exports = Payment