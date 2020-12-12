const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app= express()
// cargar rutas
const user_routes=require('./routes/user')

// middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// cors
app.use(cors ({ origin:true, credentials:true }));


//rutas 
app.use('/user',user_routes)
module.exports = app 