const User = require('../models/user')


// createUser 
module.exports.createUser = (obj) => {
    return User.create(obj)
}

// find Users 

module.exports.findAllUser = () => {
    return User.find()
}

module.exports.findOneUserById = (id) => {
    return User.findById(id)
}

module.exports.findOneUser = (obj) => {
    return User.findOne(obj)
}

// update Users 

module.exports.updateUsers = (obj) => {
    return User.findOneAndUpdate(obj)
}

// Delete Users 

module.exports.DeleteUsers = (id) => {
    return User.findByIdAndDelete(id)
}