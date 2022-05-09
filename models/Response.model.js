const { Schema, model } = require("mongoose");

const responseSchema = new Schema(
    {
        image: {
            type: String,
        },
        content: {
            type: String,
        },
        likes: {
            type: Number,
        },
        creator: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
    },
    {
        timestamps: true,
    }
)
const Response = model("Response", userSchema)

module.exports = Response