const express= require('express')
const UserController=require('../controllers/user')

const user_routes = express.Router()

user_routes.get('/',UserController.index)
user_routes.get('/:id',UserController.show)
user_routes.post('/',UserController.store)
user_routes.put('/:id',UserController.update)
user_routes.delete('/:id',UserController.destroy)
module.exports=user_routes