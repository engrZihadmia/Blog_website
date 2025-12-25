//Name Email Password Profile

const {Schema, model}= require('mongoose')
const Profile= require('./profile')

const userSchema=new Schema({
        username:{
            type:String,
            required:true,
            maxLength:15,
            trim:true,
        },
        email:{
            type:String,
            trim:true,
            required:true,
        },

        password:{
            type:String,
            required:true
        },

        profile:{
            id:Schema.types.objectId,
            ref:Profile,
        }
})

module.exports=model('User', userSchema)

