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
            type: [String],
            required: [true, 'Indica la requerimientos necesarios para el curso'],
        },
        content: {
            type: String,
            required: [true, 'Indica el contenido del curso'],
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
            default: null
        },
        price_detail: {
            currency: {
                type: String,
                enum: ["EUR", "USD"]
            },
        },
        category: {
            type: String,
            required: [true, 'Indica una categoria'],
            enum: ["Tecnología", "Diseño", "Marketing", "Informática y software", "Música", "Salud y fitness", "Otros"]
        },
        urls: [String],
        payment: {
            type: String,  //no tenemos ni pi
        }

    },
    {
        timestamps: true,
    }
)

const Course = model("Course", CourseSchema)

module.exports = Course


