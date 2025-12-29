const {
    body
} = require('express-validator')
const {
    findOneUser
} = require('../controllers/databaseControllers')
const bcryptjs = require('bcryptjs')

module.exports = [

    body('email')
        .isEmail()
        .withMessage("Your Email is not a valid Email")
        .normalizeEmail()
        .custom(async (value) => {
            let getEmail = await findOneUser({
                email: value
            })
            if (!getEmail) {
                throw new Error('Invalid Email!')
            }

            return true
        }),

    body('password')
        .isLength({
            min: 6
        })
        .withMessage('Password minimum 6 character')
        .custom(async (value, {
            req
        }) => {

            let email = req.body.email;
            if (!email) {
                throw new Error('First Enter Email!')
            }
            let RealPassword = await findOneUser({
                email: req.body.email
            })

            let match = await bcryptjs.compare(value, RealPassword.password)

            if (!RealPassword) {
                throw new Error('You are not User!')
            } else if (!match) {
                throw new Error('Invalid Password!')
            }


            return true;
        })

]