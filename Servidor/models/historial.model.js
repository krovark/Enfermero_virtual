var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var historialSchema = new mongoose.Schema({
    horario: { type: String, required: true },
    fecha: { type: String, required: true },
    tratamiento: { type: String, required: false },
    medicamento: { type: String, required: false },
    dosisnumero: { type: Number, required: false },
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
    // action: { type: String, required: true },
    // alarmNotifData: {
    //     id: { type: String, required: true }
    // },
    // status: { type: Boolean, required: true },
    // isEnabled: { type: Boolean, required: false },

    
},{collection: 'history'});

historialSchema.plugin(mongoosePaginate);

const Historial = mongoose.model('Historial', historialSchema, 'history');
module.exports = Historial;
