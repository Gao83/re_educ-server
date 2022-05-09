const { Schema, model } = require("mongoose");

const ratingSchema = new Schema(
    {
        image: String,
        content: String,
        rating: Number,
        likes: Number,
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        course: {
            type: Schema.Types.ObjectId,
            ref: 'Course'
        },
        teacher: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        responses: [                                              //¿?No sabemos como hacer esto!!!!!!!!!
            {
                type: Schema.Types.ObjectId,
                ref: 'Response'
            }
        ],
    },
    {
        timestamps: true,
    }
)


const Rating = model("Rating", ratingSchema)

module.exports = Rating

