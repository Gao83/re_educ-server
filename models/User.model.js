const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    role: {
      type: String,
      enum: ['USER', 'ADMIN', 'TEACHER'],
      default: 'USER'
    },
    username: {
      type: String,
      required: [true, 'Indica tu nombre'],
      trim: true
    },
    email: {
      type: String,
      // unique: ttrue,
      required: [true, 'Indica un email'],
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
    },
    profileImg: {
      type: String,
      default: 'https://happytravel.viajes/wp-content/uploads/2020/04/146-1468479_my-profile-icon-blank-profile-picture-circle-hd-600x475.png'
    },
    interests: {
      type: String,
      enum: ["Lenguajes de programación", "Diseño de interfaces", "Fundamentos de marketing", "Criptomonedas y Blockchain", "Salud Mental", "Deportes", "Otros"],
      default: "Otros"

    },
    education: {
      type: String,
      enum: ["Bachillerato", "Formación Profesional", "Grado Universitario", "Enseñanzas de régimen especial", "Otros"],
      default: "Otros"
    },
    aboutMe: {
      type: String,
      default: ''
    },
    courses: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        default: ''
      }
    ],
  },
  {
    timestamps: true,
  }

)

const User = model("User", userSchema)

module.exports = User
