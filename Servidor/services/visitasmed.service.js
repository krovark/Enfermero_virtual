// Gettign the Newly created Mongoose Model we just created 
var Visitasmed = require('../models/visitasmed.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { parseFecha } = require('../utils/moments')
const moment = require('moment');
const mongoose = require('mongoose');


// Saving the context of this module inside the _the variable
_this = this

// Async function to get the User List

exports.getVisitasmed = async function (query, page, limit) {
    var options = { page, limit };

    try {
        var visitasResult = await Visitasmed.paginate(query, options);

        
        var visitasFormateadas = visitasResult.docs.map(visita => {
            return {
                ...visita.toObject(), // Convierte el documento Mongoose a un objeto JS
                fecha: new Date(visita.fecha).toLocaleDateString('es-AR'), // Formatea la fecha
                hora: new Date(visita.hora).toLocaleTimeString('es-AR'), // Formatea la hora
            };
        });

        // Reemplazar los docs con las visitas formateadas
        visitasResult.docs = visitasFormateadas;

        return visitasResult;
    } catch (e) {
        console.error("error services", e);
        throw Error('Error while Paginating Visitas Med');
    }
}

exports.getProximasVisitasmed = async function (userId) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    try {
        var proximasVisitas = await Visitasmed.find({
            userID: mongoose.Types.ObjectId(userId),
            fecha: { $gte: today }
        }).sort({ fecha: 1 }).limit(4);

        // Transformar las fechas a formato dd/mm/aaaa y las horas al formato local
        var visitasFormateadas = proximasVisitas.map(visita => {
            return {
                ...visita.toObject(), // Convierte a un objeto JavaScript simple
                fecha: moment(visita.fecha).format('DD/MM/YYYY'), // Formatea la fecha
                hora: new Date(visita.hora).toLocaleTimeString('es-AR'), // Formatea la hora al horario local
            };
        });

        return visitasFormateadas;
    } catch (e) {
        console.error("Error al obtener próximas visitas medicas: " + e.message);
        throw Error("Error al obtener próximas visitas medicas");
    }
};



exports.createVisitasmed = async function (visitasmed){

    const fechaFormatoISO = moment(visitasmed.fecha, 'DD/MM/YYYY').toDate();

    var newVisitasmed = new Visitasmed({
        visita: visitasmed.visita,
        fecha: fechaFormatoISO,
        hora: visitasmed.hora,
        direccion: visitasmed.direccion,
        userID: visitasmed.userID
    });

    try {
        console.log(newVisitasmed);
        var savedVisitasmed = await newVisitasmed.save();
        var token = jwt.sign({ id: savedVisitasmed._id }, process.env.SECRET, { expiresIn: 86400});
        return token;
    } catch (e) {
        console.error(e);
        throw Error("Error al crear Visita Medica");
    }
}

exports.updateVisitasmed = async function (visitasmedId, visitasmedData){
    try{
        var updatedVisitasmed = await Visitasmed.findByIdAndUpdate(visitasmedId, visitasmedData, { new:true });
        return updatedVisitasmed;
    } catch (e) {
        throw Error("Error al actualizar las visitas medicas");
    }
}

exports.deleteVisitasmed = async function (id) {
    console.log(id)
    // Delete the Visitas medicas
    try {
        var deleted = await Visitasmed.remove({
            _id: id
        })
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("Visitas medicas Could not be deleted")
        }
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the Visitas medicas")
    }
}

exports.getAllVisitasmed = async function () {
    try {
        var visitasmed = await Visitasmed.find({});
        return visitasmed;
    } catch (e) {
        throw Error('Error al obtener todos las visitas medicas');
    }
}

exports.getProximosTratamientos = async (userID) => {
    try {
        // Obtener la fecha y hora actual
        const ahora = new Date();
        // Buscar tratamientos que comiencen después de la fecha y hora actual
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
