var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var uniqueValidator = require('mongoose-unique-validator');

var tratamientoSchema = new mongoose.Schema({
    tratamieto: {type: String, required: true},
    horario: { type: String, required: true},
    notas: {type: String, required: true},
    alarma: { type: Boolean, required: true },
    frecuencia: {type: String, required: true},
});

// Agregando el plugin para paginación
tratamientoSchema.plugin(mongoosePaginate);
tratamientoSchema.plugin(uniqueValidator, { message: '{PATH} ya registrado' });

// Creando y exportando el modelo
const Tratamiento = mongoose.model('Tratamiento', tratamientoSchema);
module.exports = Tratamiento;