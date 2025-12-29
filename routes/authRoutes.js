const Router = require('express').Router()
const SingUpValidator = require('../validators/SingUpValidator')
const logInValidator = require('../validators/loginValidator')

const {
    singUpGetController,
    singUpPostController,
    logInGetController,
    logInPostController,
    logOutController,
    allUsersController,
} = require('../controllers/authControllers')


Router.get('/singup', singUpGetController)
Router.post('/singup', SingUpValidator, singUpPostController)

Router.get('/login', logInGetController)
Router.post('/login', logInValidator, logInPostController)

Router.post('/logout', logOutController)


// test Routes 
Router.get('/users', allUsersController)



module.exports = Router;