const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
    {
        image: String,
        content: String,
        rating: Number,
        date: Date,
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


module.exports = model("Comment", commentSchema)

module.exports = Comment

