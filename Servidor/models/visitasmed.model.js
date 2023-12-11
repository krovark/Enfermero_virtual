var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');


var validateFecha = (fecha) => {
    return /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/\d{4}$/.test(fecha);
};

var visitasmedSchema = new mongoose.Schema({
    visita: { type: String, required: true},
    fecha: {type: Date, required: true},
    hora: { type: String, required: true },
    direccion: {type: String, required: true},

},{collection: 'turnos'});

// Agregando el plugin para paginación
visitasmedSchema.plugin(mongoosePaginate);


// Creando y exportando el modelo
const Visitasmed = mongoose.model('Visitas Medicas', visitasmedSchema);
module.exports = Visitasmed;