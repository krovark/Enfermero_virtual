const Tratamiento = require('../models/tratamiento.model');
const Alarma = require('../models/alarma.model');
const mongoose = require('mongoose');
const schedule = require('node-schedule');


function programarRecurrencia(tratamiento) {
    const { recurrencia, duracion, fechaInicio, idPersona } = tratamiento;
    const duracionInt = parseInt(duracion, 10);
    if (recurrencia === 'diaria' || recurrencia === 'semanal') {
        programarNotificacionesPorRecurrencia(tratamiento, fechaInicio, recurrencia === 'diaria' ? 1 : 7, duracionInt, idPersona);
    }
}

function programarNotificacionesPorRecurrencia(tratamiento, fechaInicio, incremento, duracion, idPersona) {
    for (let i = 1; i <= duracion; i++) {
        let fechaNotificacion = new Date(fechaInicio);
        fechaNotificacion.setDate(fechaNotificacion.getDate() + i * incremento);

        programarNotificacion(tratamiento, fechaNotificacion, idPersona);
    }
}

async function programarNotificacion(tratamiento, fechaNotificacion, idPersona) {
    try {
        await guardarAlarma(tratamiento._id, fechaNotificacion, idPersona);
    } catch (error) {
        console.error(`Error al programar la notificación: ${error}`);
    }
}

async function guardarAlarma(tratamientoId, fechaNotificacion, idPersona) {

    try {
        const nuevaAlarma = new Alarma({
            tratamientoId,
            fechaNotificacion,
            idPersona,
        });


        await nuevaAlarma.save();
    } catch (error) {
        console.error(`Error al guardar la alarma: ${error}`);
    }
}




exports.createTratamiento = async (tratamientoData) => {
    try {
        const nuevoTratamiento = new Tratamiento(tratamientoData);
        const resultado = await nuevoTratamiento.save();
        programarRecurrencia(resultado);

        return resultado;
    } catch (error) {
        throw new Error("Error al crear el tratamiento");
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
