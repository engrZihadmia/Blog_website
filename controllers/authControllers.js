const bcryptjs = require('bcryptjs')
const {
    findAllUser,
    findOneUserById,
    findOneUser,
    DeleteUsers,
    createUser
} = require('./databaseControllers')
const {
    validationResult
} = require('express-validator')



module.exports.singUpGetController = (req, res, next) => {

    res.render('pages/authPages/singup.ejs', {
        errors: {},
        previousValues: {}
    })
}

module.exports.singUpPostController = async (req, res, next) => {
    const errorFormater = obj => obj.msg;
    const ErrorResult = validationResult(req)
    const errors = ErrorResult.formatWith(errorFormater).mapped()
    const {
        username,
        email,
        password
    } = req.body;

    try {

        if (!ErrorResult.isEmpty()) {
            console.log(errors)
            return res.render('pages/authPages/singup.ejs', {
                errors: errors,
                previousValues: {
                    username,
                    email,
                    password
                }
            })
        }

        let hashPassword = await bcryptjs.hash(password, 10)
        let createNewUser = await createUser({
            username,
            email,
            password: hashPassword
        })

        res.render('pages/authPages/login.ejs', {
            errors: {},
            previousValues: {}
        })


    } catch (err) {
        console.log(err)
    }


}

module.exports.logInGetController = (req, res, next) => {
    res.render('pages/authPages/login.ejs', {
        errors: {},
        previousValues: {}
    })
}

module.exports.logInPostController = async (req, res, next) => {

    const errorFormater = obj => obj.msg;
    const ErrorResult = validationResult(req)
    const errors = ErrorResult.formatWith(errorFormater).mapped()

    const {
        email,
        password
    } = req.body;
    try {
        if (!ErrorResult.isEmpty()) {
            console.log(errors)
            return res.render('pages/authPages/login.ejs', {
                errors: errors,
                previousValues: {
                    email,
                    password
                }
            })
        }
        let findThisUser = await findOneUser({
            email
        })

        if (!findThisUser) {
            console.log('Invalid Creadentials')
        }

        let isMatch = await bcryptjs.compare(password, findThisUser.password)
        if (!isMatch) {
            console.log("Invalid Creadentials")
        }
req.session.isLoggedIN=true,
req.session.user=findThisUser
        res.render('pages/home.ejs')

    } catch (err) {
        console.log(err)
    }
}

module.exports.logOutController = (req, res, next) => {

}

// Test Controllers 

module.exports.allUsersController = async (req, res) => {
    try {
        let Allusers = await findAllUser()
        res.render('pages/authPages/demoUser.ejs', {
            Allusers: Allusers
        })

    } catch (err) {
        console.log(err)
    }

}