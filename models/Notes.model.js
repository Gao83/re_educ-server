const { Schema, model } = require("mongoose");

const notesSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        course: {
            type: Schema.Types.ObjectId,
            ref: 'Rating'
        },
   
    },
    {
        timestamps: true,
    }
)
const Notes = model("Notes", notesSchema)

module.exports = Notes