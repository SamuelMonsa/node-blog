const User = require('../models/user')
const validateForm = require('../services/form_validation')
const bcrypt = require('bcrypt')
const moment = require('moment')

const UserController = {
    index: (req,res) => {
        //sort es un order by y -created_at para traerlo descendentemente
        User.find({ enabled:true }, 'name surname email').sort('-created_at').exec((err, users) => {
            if (err) return res.status(500).send({ message: 'Error en el servidor', err })
            return res.status(200).send(users)
        })
    },
    // url por id
    show:(req,res)=>{
        //obtener el id en la url
        const id=req.params.id
        //obtener documento por id
        // llamado de regreso callback
        User.findById(id, (err, user)=>{
            if (err) return res.status(500).send({message:'Error en el servidor', err}) 
            return res.status(200).send(user)
        })
    },

    update:(req,res)=>{
        // enivar el id por url
        const id=req.params.id
        const body=req.body
        validateForm(body,{
            name: 'required|string',
            surname: 'required|string',
            email: 'required|email',
        }).then(validForm =>{           
            if (!validForm.success) return res.status(400).send({message:'Error en el seridor', errors: validForm.errors}) 
            const data = {
                name:body.name,
                surname:body.surname,
                email:body.email
            }
            User.findByIdAndUpdate(id, data, { new:true }, (err, userUpadted)=>{
                if(err) return res.status(500).send({message:'Error en el servidor', err })
                return res.status(200).send(userUpadted)
            })  
        })

    },

    destroy:(req,res)=>{
        const id=req.params.id
        User.findByIdAndUpdate(id,{enabled:false},{new:true},(err,userDestroy)=>{
            if(err) return status(500).send({message:'Error del servidor', err})
            return res.status(200).send(userDestroy)
        })
    },

    store:(req,res) => {
        const body = req.body
        validateForm(body, {
            name: 'required|string',
            surname: 'required|string',
            email: 'required|email',
            password: 'required|minLength:8'
        }).then(validForm => {
            if (!validForm.success) return res.status(400).send({ message: 'Error en el formulario', errors: validForm.errors })
            //  guardar el usuario
            const user = new User({
                name: body.name,
                surname: body.surname,
                email: body.email,
                password: bcrypt.hashSync(body.password, 10),
                created_at: moment().unix(),
            })
            // metodo save especial de mongo
            user.save((err, userStored) => {
                // si entre muestra el error, el status 500 es para el error sevidor, 400 es para el error del usuario, 404 not found
                if (err) return res.status(500).send({ message: 'no se guardó el usuario', err })
                userStored.password = undefined;
                // status 200 para la respuesta correcta
                return res.status(200).send(userStored)
            })
        })
    }
}

module.exports = UserController

