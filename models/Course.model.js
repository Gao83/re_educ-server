const { Schema, model } = require("mongoose");

const CourseSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Indica el nombre del curso'],
            unique: true,
        },
        courseImg: {
            type: String,
            default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEoaTsWQuPn6bW-_n6hqZvmy5Lh64qwETLg&usqp=CAU'
        },
        headline: {
            type: String,
            required: [true, 'Indica un titular molón para tu curso'],
        },
        description: {
            type: String,
            required: [true, 'Indica la descripción del curso'],
        },
        requirements: {
            type: String,
            required: [true, 'Indica la requerimientos necesarios para el curso'],
        },
        content: {
            type: String,
            required: [true, 'Indica la contenido del el curso'],
        },
        duration: {
            type: String,
            required: [true, 'Indica la duración del curso'],
        },
        date: {
            type: Date,
        },
        isPaid: {
            type: Boolean,
            default: false,
        },
        price: {
            type: Number,
            default: 0,
            required: [true, 'Indica el precio del curso'],
        },
        price_detail: {
            currency: {
                type: String,
                enum: ["EUR", "USD"]
            },
            currency_symbol: {
                type: String,
                enum: ["€", "$"]
            }
        },
        category: {
            type: String,
            required: [true, 'Indica una categoria'],
            enum: ["1", "2", "3", "4", "5"]
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        image: {
            type: String,
        },
        url: [String],
        payment: {
            type: String,  //no tenemos ni pi
        },
        rating: {
            type: Number
        }

    },
    {
        timestamps: true,
    }
)

const Course = model("Course", courseSchema)

module.exports = Course



