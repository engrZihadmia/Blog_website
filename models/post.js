// title, body,author, tag, image, likes, dislikes, comments.

const  {Schema,model}= require('mongoose')
const Comment =require('./comment')
const User=require('./user')

const postSchema= new Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        maxLength:100,
    },

    body:{
        type:String,
        required:true,
        trim:true,
    },
    author:{
        type:Schema.Types.ObjectId,
        ref: User,
        required:true,
    },
    tag:   {
            type:[String],
            trim:true,
            required:true,
        },

        thumbnail:  String,
        readTime:String,
        likes:[ {
            type:Schema.Types.ObjectId,
            ref:User,
        }],
        disLikes:[ {
            type:Schema.Types.ObjectId,
            ref:User,
        }],

        comment:[
            {
                type:Schema.Types.ObjectId,
                ref: Comment,
            }
        ]
}, {timeStamps:true})


module.exports=model('Post',postSchema)