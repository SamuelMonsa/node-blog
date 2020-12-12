const mongoose = require('mongoose')
const UserSchema = mongoose.Schema({
    nombre: String,
    apellidos: String,
    cedula: String,
    correo: String,
    clave: String,
    created_at: Number
})

const User = mongoose.model('User',UserSchema)
module.exports= User