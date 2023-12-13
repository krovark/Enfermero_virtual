const Tratamiento = require('../models/tratamiento.model');
const Alarma = require('../models/alarma.model');
const mongoose = require('mongoose');
const schedule = require('node-schedule');




exports.createTratamiento = async (tratamientoData) => {
    tratamientoData.idPersona = mongoose.Types.ObjectId(tratamientoData.idPersona);
    try {
        const nuevoTratamiento = new Tratamiento(tratamientoData);
        const resultado = await nuevoTratamiento.save();
        return resultado;
    } catch (error) {
        console.error("Error al crear el tratamiento1:", error);
        throw new Error(`Error al crear el tratamiento1: ${error.message}`);
    }
};



exports.getTratamiento = async (userID, page, limit) => {

    var queryWithUser = { ...query, userId: userId };
    var options = { page, limit };

    try {
        var options = {
            page,
            limit
        };
        const tratamientos = await Tratamiento.paginate({ userID: userID }, options);
        return tratamientos;
    } catch (error) {
        console.error("Error al obtener tratamientos:", error); // Registro de errores
        throw new Error("Error al obtener tratamientos");
    }
};


exports.getAllTratamiento = async function (idUser, page, limit) {
    try {

        var idUserObjectId = mongoose.Types.ObjectId(idUser);

        var options = {
            page,
            limit
        };
        var tratamiento = await Tratamiento.paginate( { idPersona: idUserObjectId } , options);
        return tratamiento;
    } catch (e) {
        console.error("Error en el servicio", e);
        throw Error('Error while Paginating tratamiento');
    }
};


exports.updateTratamiento = async (idPersona, idTratamiento, tratamientoData) => {
    try {
        const resultado = await Tratamiento.findOneAndUpdate(
            { idPersona, _id: idTratamiento },
            tratamientoData,
            { new: true }
        );
        return resultado;
    } catch (error) {
        console.error(error);
        throw new Error("Error al actualizar el tratamiento");
    }
};

exports.removeTratamiento = async (idPersona, idTratamiento) => {
    try {
        await Tratamiento.findOneAndRemove({ idPersona, _id: idTratamiento });
        return { mensaje: 'Tratamiento eliminado exitosamente' };
    } catch (error) {
        console.error(error);
        throw new Error("Error al eliminar el tratamiento");
    }
};

exports.getProximosTratamientos = async (userID) => {
    try {
        const ahora = new Date();
        const tratamientos = await Tratamiento.find({ 
            userID: userID,
            fechaInicio: { $gte: ahora } 
        }).sort({ fechaInicio: 1 }).limit(3);

        return tratamientos;
    } catch (error) {
        console.error("Error al obtener próximos tratamientos:", error);
        throw new Error("Error al obtener próximos tratamientos");
    }
};
