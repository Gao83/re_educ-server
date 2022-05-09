const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
    {
        image: {
            type: String,
        },
        content: {
            type: String,
        },
        rating: {
            type: Number,
        },
        date: {
            type: Date,
        },
        likes: {
            type: Number,
        },
        creator: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        courseEval: {
            type: Schema.Types.ObjectId,
            ref: 'Course'
        },
        teacherEval: {
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

