var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var historialSchema = new mongoose.Schema({
    time: { type: String, required: true },
    date: { type: String, required: true },
    medicine: { type: String, required: true },
    action: { type: String, required: true },
    alarmNotifData: {
        id: { type: String, required: true }
    },
    status: { type: Boolean, required: true },
    isEnabled: { type: Boolean, required: false },
    _idUser: { type: mongoose.Schema.Types.ObjectId, required: true }
});

historialSchema.plugin(mongoosePaginate);

const Historial = mongoose.model('Historial', historialSchema, 'history');
module.exports = Historial;
