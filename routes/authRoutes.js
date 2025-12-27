const Router= require('express').Router

const {
    singUpGetController,
    singUpPostController,
    logInGetController,
    logInPostController,
    logOutController,
} = require('../controllers/authControllers')


Router.get('/singup', singUpGetController)
Router.post('/singup', singUpPostController)

Router.get('/login', logInGetController)
Router.post('/login', logInPostController)

Router.post('/logout', logOutController)



module.exports=Router;