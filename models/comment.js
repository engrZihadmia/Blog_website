// post user body replies

const {
    model,
    Schema
} = require('mongoose')


const commentSchema = new Schema({
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post",
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },

    body: {
        type: String,
        required: true,
        trim: true,
    },

    replies: [{
        body: {
            type: String,
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,

        },

        createdAt: {
            type: Date,
            default: new Date(),
        },


    }]
}, {
    timestamps: true
})


module.exports = model('Comment', commentSchema)