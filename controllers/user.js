const validateForm = require('../services/form_validation')

const UserController = {
    index: (req,res) => {
        return res.status(200).send({ valor: 'algo'})
    },
    store: (req,res) => {
        const body = req.body
        validateForm(body, {
            name: 'required|string',
            surname: 'required|string',
            email: 'required|email',
            password: 'required|min:8'
        }).then(validForm => {
            if (!validForm.success) return res.status(400).send({ message: 'Error en el formulario', errors: validForm.errors })
        })
    }
}

module.exports = UserController

