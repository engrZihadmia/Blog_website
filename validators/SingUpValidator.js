const {
    body
} = require('express-validator')
const {
    findOneUser
} = require('../controllers/databaseControllers')

module.exports = [
    body('username')
        .not()
        .isEmpty()
        .withMessage("UserName Can't be Empty")
        .isLength({
            max: 15,
        })
        .customSanitizer((value) => {
            return value = value.startsWith('@') ? value : `@${value}`
        }),

    body('email')
        .isEmail()
        .withMessage("Your Email is not a valid Email")
        .normalizeEmail()
        .custom(async (value) => {
            let getEmail = await findOneUser({
                email: value
            })
            if (getEmail) {
                throw new Error('This Email ALready Used')
            }

            return true
        }),

    body('password')
        .isLength({
            min: 6
        })
        .withMessage('Password minimum 6 character'),

    body('confirmpassword')
        .custom((value, {
            req
        }) => {
            if (value != req.body.password) {
                throw new Error('Password Does not Match')
            }

            return true;
        })



]