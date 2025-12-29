const express = require("express")
const dotenv = require("dotenv")
const mongoose = require('mongoose')
const ejs = require('ejs')
const morgan = require('morgan')
const AuthRouters= require('./routes/authRoutes')
const session = require('express-session')
const myMongoDbSession =require('connect-mongodb-session')(session)
dotenv.config()
const app = express()

// Environment Varrable data 
const PORT = process.env.PORT || 8080
const MongoDbUrl = process.env.MongoDbUrl

let myStore= new myMongoDbSession ({
    uri:MongoDbUrl,
    collection:'blogSessoins'
}) 

myStore.on('error', function(error) {
  console.log(error);
});


// set up View Engine 
app.set('view engine', ejs)
app.set('views', 'views')

// MiddleWare Array
const MiddlewareArray = [
    morgan('dev'),
    express.static('public'),
    express.urlencoded({ extended: true }),
    express.json(),
    session({
        secret:"Secret_key",
        resave:false,
        saveUninitialized:false,
        store:myStore,
        cookie:{
            maxAge:1000*60*600*2
        }
    }),

    AuthRouters
]


app.use(MiddlewareArray)


app.get('/', (req, res) => {
    if(req.session.isLoggedIN){
        console.log(`session : ${req.session.isLoggedIN}`)
        console.log(req.session.user)
    }
 res.render('pages/home.ejs')
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