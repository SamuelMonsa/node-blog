const express= require('express')
const UserController=require('../controllers/user')

const user_routes = express.Router()

user_routes.get('/',UserController.index)
user_routes.post('/',UserController.store)

module.exports=user_routes