const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    username: String,
    password: String
})

const UserModele = mongoose.model('User', UserSchema)

module.exports = UserModele