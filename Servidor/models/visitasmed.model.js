var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var uniqueValidator = require('mongoose-unique-validator');

var validateFecha = (fecha) => {
    return /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/\d{4}$/.test(fecha);
};

var visitasmedSchema = new mongoose.Schema({
    visita: { type: String, required: true},
    fecha: {type: Date, required: true, validate: [validateFecha, 'Formato de fecha inválido. Use dd/mm/aaaa.']},
    hora: {type: TimeRanges, required: true},
    direccion: {type: String, required: true},

});

// Agregando el plugin para paginación
visitasmedSchema.plugin(mongoosePaginate);
visitasmedSchema.plugin(uniqueValidator, { message: '{PATH} ya registrado' });

// Creando y exportando el modelo
const Visitasmed = mongoose.model('Visitas Medicas', visitasmedSchemaSchema);
module.exports = Visitasmed;