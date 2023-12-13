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
        console.log("Fecha y hora actual: ", ahora);
        console.log("UserID: ", userID);

        const tratamientos = await Tratamiento.find({ 
            userID: userID,
            fechaInicio: { $lte: ahora },
            hastaCuando: { $gte: ahora }
        }).sort({ fechaInicio: 1 }).limit(3);
        
        const tratamientosConContador = tratamientos.map(t => {
            const fechaInicio = new Date(t.fechaInicio);
            const fechaHastaCuando = new Date(t.hastaCuando);
            const diferenciaHoras = Math.abs(ahora - fechaInicio) / 36e5; // Diferencia en horas
            const tomasRealizadas = Math.floor(diferenciaHoras / t.intervalo);
            const tomasRestantes = t.tomas - tomasRealizadas;

            return {
                ...t._doc,
                fechaInicio: fechaInicio.toLocaleDateString("es-AR"),
                hastaCuando: fechaHastaCuando.toLocaleDateString("es-AR"),
                tomasRealizadas,
                tomasRestantes
            };
        });

        console.log("Tratamientos en curso con contador de tomas y fechas formateadas: ", tratamientosConContador);
        return tratamientosConContador;
    } catch (error) {
        console.error("Error al obtener tratamientos en curso:", error);
        throw new Error("Error al obtener tratamientos en curso");
    }
};


exports.getTratamientosFinalizados = async function (userId) {
    try {
        const ahora = new Date();
        const tratamientosFinalizados = await Tratamiento.find({
            userID: userId,
            hastaCuando: { $lt: ahora }
        }).sort({ hastaCuando: -1 });

        return tratamientosFinalizados;
    } catch (error) {
        console.error("Error en el servicio al obtener tratamientos finalizados:", error);
        throw Error('Error while Getting Tratamientos Finalizados');
    }
};
