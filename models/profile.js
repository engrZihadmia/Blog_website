// user title bio profilepic links{fb, instagram, linkedin} bookmark[] posts[]

const {model , Schema} = require('mongoose')
const Post = require('./post')
const User= require('./user')

const profileSchema= new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:User,
    }, 

    name:{
        type:String,
        required:true,
        maxLength:30,
        trim:true,
    },

    title:{
        type:String,
        trim:true,
        maxLength:100,
    },

    bio:{
        type:String,
        
    },
    
    profilePic:String,

    links:{
        Website:String,
        Facebook:String,
        Twitter:String,
        Linkedin:String,
        github:String
    },

    post:[
        {
            type:Schema.Types.ObjectId,
            ref:Post,
        }
    ],

    bookmark:[
            {
                type:Schema.Types.ObjectId,
                ref:Post,
            }, 
    ],

}, {timestamps:true})


module.exports=model('Profile', profileSchema)