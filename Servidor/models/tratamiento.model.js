const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const tratamientoSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    idPersona: { type: mongoose.Schema.Types.ObjectId, ref: 'Persona', required: true },
    medicamento: { type: String, required: true },
    dosis: { type: String, required: true },
    recurrencia: { type: String, required: true },
    duracion: { type: Number, required: true },
    fechaInicio: { type: Date, required: true },
    hastaCuando: { type: Date },
});

tratamientoSchema.plugin(mongoosePaginate);

const Tratamiento = mongoose.model('Tratamiento', tratamientoSchema);

module.exports = Tratamiento;