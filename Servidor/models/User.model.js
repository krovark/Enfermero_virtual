var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var uniqueValidator = require('mongoose-unique-validator');

// Validador personalizado para la fecha de nacimiento
var validateFechaNacimiento = (fecha) => {
    return /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/\d{4}$/.test(fecha);
};

var perfilSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    edad: { type: Number, required: true },
    genero: { 
        type: String, 
        required: true, 
        enum: ['M', 'F'],
        message: 'Género no válido. Solo se acepta "M" o "F".'
    },
    telefono: { type: String, unique: true },
    sangreTipo: String,
    peso: Number,
    altura: Number,
    c_emergencia: String,
    profileURL: String
});

var UserSchema = new mongoose.Schema({
    username: { type: String, required: false },
    password: { type: String, required: true },
    perfil: perfilSchema,
    fechaNacimiento: { 
        type: String,
        required: false,
        validate: [validateFechaNacimiento, 'Formato de fecha inválido. Use dd/mm/aaaa.']
    },
    email: { type: String, required: true, unique: true },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
},{collection: 'user'});

// Agregando el plugin para paginación
UserSchema.plugin(mongoosePaginate);
//UserSchema.plugin(uniqueValidator, { message: '{PATH} ya registrado' });

// Creando y exportando el modelo
const User = mongoose.model('User', UserSchema);
module.exports = User;
