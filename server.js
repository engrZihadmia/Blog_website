const express = require("express")
const dotenv = require("dotenv")
const mongoose = require('mongoose')
const ejs = require('ejs')
const morgan = require('morgan')
dotenv.config()
const app = express()


const PORT = process.env.PORT || 8080
const MongoDbUrl = process.env.MongoDbUrl

// set up View Engine 
app.set('view engine', ejs)
app.set('views', 'views')

// MiddleWare Array
const MiddlewareArray = [
    morgan('dev'),
    express.static('public'),
    express.urlencoded({ extended: true }),
    express.json()
]


app.use(MiddlewareArray)


app.get('/', (req, res) => {
 res.render('pages/authPages/singup.ejs')
})


const createServer = async (PORT, MongoDbUrl) => {

    try {
        let mongoDbConnect = await mongoose.connect(MongoDbUrl)
        console.log('MongoDb is Connected' + mongoDbConnect.connection.host)
        app.listen(PORT, () => { console.log(`Server is Running on Port ${PORT}`) })
    }

    catch (err) {
        console.log(err)
        process.exit(1)
    }


}


createServer(PORT, MongoDbUrl)