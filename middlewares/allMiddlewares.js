const bcrypt = require('bcryptjs')
const {body} = require('express-validator')

const middleware = {

    validarInvoice: [
        body('razonSocial').notEmpty().withMessage("Debe especificar la razón social o el nombre de la persona"),
        body('rfc').notEmpty().withMessage("Debe especificar el RFC de la empresa o persona").bail()
                   .isLength({ min: 12 }).withMessage("EL RFC debe tener mínimo 12 caracteres para personas morales y 13 caracteres para personas físicas").bail()
                   .isAlphanumeric().withMessage("EL RFC debe contener caracteres alfanuméricos"),
        body('idDireccion').notEmpty().withMessage("Debe seleccionar una dirección de la lista o seleccionar la opción de 'Agregar una nueva dirección'").bail()
    ],

    validarRegistro: [
        body('firstName').notEmpty().withMessage("Debe especificar su nombre."),
        body('lastName').notEmpty().withMessage("Debe especificar sus apellidos."),
        body('email').notEmpty().withMessage("Debe especificar un email.").bail()
                      .isEmail().withMessage('Debe introducir un email válido.'),
        body('password').matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/).withMessage("La contraseña debe tener una letra en minúscula, una letra en mayúscula, un número y al menos 8 caracteres.")
    ],

    validarLogin: [
        body('email').notEmpty().withMessage("Debe especificar un email.").bail()
                     .isEmail().withMessage('Debe introducir un email válido.'),
        body('password').matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/).withMessage("La contraseña no es correcta, por favor, intente nuevamente.")
    ],

    validarDataUser: [
        body('nombre').notEmpty().withMessage("Debe especificar su nombre"),
        body('apellido').notEmpty().withMessage("Debe especificar su apellido"),
        body('correo').notEmpty().withMessage("Debe especificar un email")
                    .isEmail().withMessage("Debe especificar un email válido")  
    ],

    validarDataUserPassword: [
        body('cambiarContraseña').notEmpty().withMessage("Debe seleccionar una opción en 'Cambiar contraseña'"),                             
        body('contraseña').matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/).withMessage("La contraseña debe tener una letra en minúscula, una letra en mayúscula, un número y al menos 8 caracteres."),
        body('confContraseña').matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/).withMessage("La confirmación de la contraseña debe tener una letra en minúscula, una letra en mayúscula, un número y al menos 8 caracteres.")
                           .custom((value, {req}) => {
                                if(value !== req.body.contraseña){
                                    console.log('Values es igual a: ', value)
                                    throw new Error('La nueva contraseña y su confirmación no son iguales')  
                                }
                                return true
                            }),
        body('contraseñaActual').matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/).withMessage("La contraseña actual debe tener una letra en minúscula, una letra en mayúscula, un número y al menos 8 caracteres.")
                            .custom((value, {req}) => {
                                const user = req.session.userLogged
                                let check = bcrypt.compareSync(value,user.password)
                                if(!check){
                                    throw new Error('La contraseña actual ingresada no es igual a la contraseña actual')
                                }else{
                                    if(value === req.body.contraseña){
                                        throw new Error('La nueva contraseña debe ser diferente a la contraseña actual')
                                    }
                                }
                                return true
                            })
    ]

}

module.exports = middleware