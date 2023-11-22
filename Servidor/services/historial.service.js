const mongoose = require('mongoose');
const Historial = require('../models/historial.model');

exports.getHistorial = async function (idUser, page, limit) {
    try {

        var idUserObjectId = mongoose.Types.ObjectId(idUser);
        var options = {
            page,
            limit
        };
        console.log({ _idUser: idUserObjectId } );
        var historial = await Historial.paginate( { _idUser: idUserObjectId } , options);
        return historial;
    } catch (e) {
        console.error("Error en el servicio", e);
        throw Error('Error while Paginating historial');
    }
};



exports.createHistorial = async function (historialData) {
    var newHistorial = new Historial(historialData);

    try {
        var savedHistorial = await newHistorial.save();
        return savedHistorial;
    } catch (e) {
        console.error("Error al crear Historial", e);
        throw Error("Error al crear Historial");
    }
};

exports.updateHistorial = async function (historialId, historialData) {
    try {
        var updatedHistorial = await Historial.findByIdAndUpdate(historialId, historialData, { new: true });
        return updatedHistorial;
    } catch (e) {
        console.error("Error al actualizar el Historial", e);
        throw Error("Error al actualizar el Historial");
    }
};

exports.deleteHistorial = async function (id) {
    try {
        var deleted = await Historial.deleteOne({ _id: id });
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("Historial no pudo ser eliminado");
        }
        return deleted;
    } catch (e) {
        console.error("Error al eliminar el Historial", e);
        throw Error("Error al eliminar el Historial");
    }
};

exports.getAllHistorial = async function () {
    try {
        var allHistorial = await Historial.find({});
        return allHistorial;
    } catch (e) {
        console.error('Error al obtener todos los Historials', e);
        throw Error('Error al obtener todos los Historials');
    }
};
