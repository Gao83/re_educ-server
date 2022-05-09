const { Schema, model } = require("mongoose");

const responseSchema = new Schema(
    {
        image: String,
        content: {
            type: String,
            required: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
    },
    {
        timestamps: true,
    }
)
const Response = model("Response", responseSchema)

module.exports = Response