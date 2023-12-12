const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const tratamientoSchema = new mongoose.Schema({

    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    medicamento: { type: String, required: true },
    dosis: { type: String, required: true },
    recurrencia: { type: String, required: false },
    tomas: { type: Number, required: true },
    intervalo: { type: Number, required: true },
    notas: { type: String, required: false },
    fechaInicio: { type: Date, required: true },
    hastaCuando: { type: Date },
    
},{collection: 'tratamientos'});

tratamientoSchema.plugin(mongoosePaginate);

const Tratamiento = mongoose.model('Tratamiento', tratamientoSchema);

module.exports = Tratamiento;

