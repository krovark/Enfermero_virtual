var TratamientoService = require('../services/tratamiento.services');
const mongoose = require('mongoose');

_this = this;

async function programarRecurrencia(tratamiento) {
    const { recurrencia, duracion, fechaInicio, idPersona } = tratamiento;
    const duracionInt = parseInt(duracion, 10);
    
    if (recurrencia === 'diaria' || recurrencia === 'semanal') {
        await programarNotificacionesPorRecurrencia(tratamiento, fechaInicio, recurrencia === 'diaria' ? 1 : 7, duracionInt, idPersona);
    }
}


function programarNotificacionesPorRecurrencia(tratamiento, fechaInicio, incrementoHoras, duracion, idPersona) {
    for (let i = 1; i <= duracion; i++) {
        let fechaNotificacion = new Date(fechaInicio);
        fechaNotificacion.setHours(fechaNotificacion.getHours() + i * incrementoHoras);

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

// function calcularHastaCuando(fechaInicio, duracion) {
//     const fechaFin = new Date(fechaInicio);
//     fechaFin.setDate(fechaFin.getDate() + duracion);
//     return fechaFin;
// }


function calcularHastaCuando(fechaInicio, intervalo, tomas) {
    const fechaFin = new Date(fechaInicio);
    const totalHoras = intervalo * (tomas - 1);
    fechaFin.setHours(fechaFin.getHours() + totalHoras);

    return fechaFin;
}


// Obtener lista de tratamiento
// exports.getTratamiento = async function (req, res, next) {
//     var userID = req.userId; 
//     console.log("UserID recibido en el controlador:", req.userId);
//     var page = req.query.page ? req.query.page : 1;
//     var limit = req.query.limit ? req.query.limit : 20;

//     try {
//         var tratamiento = await TratamientoService.getTratamiento(userID, page, limit);
//         return res.status(200).json({ status: 200, data: tratamiento, message: "Tratamientos obtenidos exitosamente" });
//     } catch (e) {
//         console.error("Error al obtener tratamientos:", e); // Registro de errores
//         return res.status(400).json({ status: 400, message: e.message });
//     }
// };

exports.getTratamiento = async function (req, res, next) {
    var userID = req.userId; 
    var page = req.query.page ? req.query.page : 1;
    var limit = req.query.limit ? req.query.limit : 20;

    try {
        var tratamiento = await TratamientoService.getTratamiento(userID, page, limit);

        // Mapeo para agregar el campo horarioToma
        const tratamientosConHorario = tratamiento.docs.map(t => {
            const fechaInicio = new Date(t.fechaInicio); // Asegúrate de que fechaInicio sea un objeto Date
            const horarioToma = fechaInicio.getHours().toString().padStart(2, '0') + ':' + 
                                fechaInicio.getMinutes().toString().padStart(2, '0') + ':' + 
                                fechaInicio.getSeconds().toString().padStart(2, '0');
            return {
                ...t._doc, // Esto copia todos los campos existentes del tratamiento
                horarioToma // Esto añade el horario en hora local
            };
        });

        return res.status(200).json({ status: 200, data: tratamientosConHorario, message: "Tratamientos obtenidos exitosamente" });
    } catch (e) {
        console.error("Error al obtener tratamientos:", e); // Registro de errores
        return res.status(400).json({ status: 400, message: e.message });
    }
};




exports.createTratamiento = async function (req, res, next) {
    var newTratamiento = req.body; 
    newTratamiento.userID = req.userId;
    
    newTratamiento.fechaInicio = new Date(newTratamiento.fechaInicio);
   
    newTratamiento.hastaCuando = calcularHastaCuando(newTratamiento.fechaInicio, newTratamiento.intervalo, newTratamiento.tomas);
    try {
        newTratamiento._id = mongoose.Types.ObjectId();
        const createdTratamiento = await TratamientoService.createTratamiento(newTratamiento);
        await programarRecurrencia(createdTratamiento); 
        return res.status(201).json({ token: createdTratamiento, message: "Tratamiento creado exitosamente" });
    } catch (e) {
        
        return res.status(400).json({ status: 400, message: e.message });
    }
}


// Actualizar tratamiento
exports.updateTratamiento = async function (req, res, next) {
    var tratamientoId = req.params.id; // Asumiendo que el ID se envía como parámetro
    var tratamientoData = req.body;

    try {
        var updatedTratamiento = await TratamientoService.updateTratamiento(tratamientoId, tratamientoData);
        return res.status(200).json({ status: 200, data: updatedTratamiento, message: "Tratamiento actualizado exitosamente" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

// Eliminar tratamiento
exports.removeTratamiento = async function (req, res, next) {
    var id = req.params.id; // Asumiendo que el ID se envía como parámetro

    try {
        await TratamientoService.deleteTratamiento(id);
        return res.status(200).json({ status: 200, message: "Tratamiento eliminado exitosamente" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

// Obtener todos los tratamientos
exports.getAllTratamiento = async function (req, res, next) {
    
    var idUser = req.params.idPersona;

    if (!idUser) {
        return res.status(400).json({ status: 400, message: "ID de usuario no proporcionado" });
    }

    var page = req.query.page || 1;
    var limit = req.query.limit || 10;

    try {
        var allTratamiento = await TratamientoService.getAllTratamiento(idUser, page, limit);
        return res.status(200).json({ status: 200, data: allTratamiento, message: "Todos los tratamientos obtenidos exitosamente" });
    } catch (e) {
        console.error("Error en getHistorial controller:", e);
        return res.status(400).json({ status: 400, message: e.message });
    }
}
