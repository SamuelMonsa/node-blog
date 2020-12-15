const mongoose = require('mongoose')
const UserSchema = mongoose.Schema({
    name: String,
    surname: String,
    email: String,
    password: String,
    enabled:{ type:Boolean, default: true },  
    created_at: Number
})

const User = mongoose.model('User',UserSchema)
module.exports= User