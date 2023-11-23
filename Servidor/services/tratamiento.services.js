const Tratamiento = require('../models/tratamiento.model');
const Alarma = require('../models/alarma.model');
const mongoose = require('mongoose');
const schedule = require('node-schedule');




exports.createTratamiento = async (tratamientoData) => {
    tratamientoData.idPersona = mongoose.Types.ObjectId(tratamientoData.idPersona);
    try {
        const nuevoTratamiento = new Tratamiento(tratamientoData);
        const resultado = await nuevoTratamiento.save();
        console.log(resultado);
        return resultado;
    } catch (error) {
        console.error("Error al crear el tratamiento1:", error);
        throw new Error(`Error al crear el tratamiento1: ${error.message}`);
    }
};



exports.getTratamiento = async (idPersona, idTratamiento) => {
    try {
        const tratamiento = await Tratamiento.findOne({ idPersona, _id: idTratamiento });
        return tratamiento;
    } catch (error) {
        console.error(error);
        throw new Error("Error al obtener el tratamiento");
    }
};

// exports.getAllTratamiento = async (idPersona) => {
//     try {
//         const tratamiento = await Tratamiento.find({ idPersona: idPersona });
//         return tratamiento;
//     } catch (error) {
//         console.error(error);
//         throw new Error("Error al obtener el tratamiento");
//     }
// };

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
