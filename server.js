const express = require("express")
const dotenv= require("dotenv")
const mongoose=require('mongoose')
dotenv.config()
const app=express()


const PORT=process.env.PORT || 8080
const MongoDbUrl=process.env.MongoDbUrl


const createServer=async (PORT,MongoDbUrl)=>{

    try{
            let mongoDbConnect=await mongoose.connect(MongoDbUrl)
            console.log('MongoDb is Connected')
            app.listen(PORT,()=>{console.log(`Server is Running on Port ${PORT}`)})
    }

    catch(err){
        console.log(err)
    }


}


createServer(PORT, MongoDbUrl)