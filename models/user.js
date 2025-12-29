//Name Email Password Profile

const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        maxLength: 15,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
    },

    password: {
        type: String,
        required: true
    },

    profile: {
        type: Schema.Types.ObjectId,
        ref: "Profile",
    }
})

module.exports = model('User', userSchema)

