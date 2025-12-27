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
            console.log('MongoDb is Connected' + mongoDbConnect.connection.host)
            app.listen(PORT,()=>{console.log(`Server is Running on Port ${PORT}`)})
    }

    catch(err){
        console.log(err)
        process.exit(1)
    }


}


createServer(PORT, MongoDbUrl)