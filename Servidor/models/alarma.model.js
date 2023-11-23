const mongoose = require('mongoose');

const alarmaSchema = new mongoose.Schema({
    tratamientoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tratamiento', required: true },
    fechaNotificacion: { type: Date, required: true },
    idPersona: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Alarma = mongoose.model('Alarma', alarmaSchema, 'alarmas');

module.exports = Alarma;
