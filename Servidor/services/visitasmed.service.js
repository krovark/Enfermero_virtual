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

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        console.log("Query",query)
        var Visitasmed = await Visitasmed.paginate(query, options)
        // Return the visitasmed list that was retured by the mongoose promise
        return Visitasmed;

    } catch (e) {
        // return a Error message describing the reason 
        console.error("error services",e)
        throw Error('Error while Paginating Users');
    }
}


exports.getProximasVisitasmed = async function (userId) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    console.log("UserID: " + userId);
    console.log("Fecha actual: " + today.toISOString());

    try {
        var proximasVisitas = await Visitasmed.find({
            userID: mongoose.Types.ObjectId(userId),
            fecha: { $gte: today }
        }).sort({ fecha: 1 }).limit(2);

        // Transformar las fechas a formato dd/mm/aaaa
        var visitasFormateadas = proximasVisitas.map(visita => {
            return {
                ...visita.toObject(), // Convierte a un objeto JavaScript simple
                fecha: moment(visita.fecha).format('DD/MM/YYYY') // Formatea la fecha
            };
        });

        console.log("Próximas Visitas: ", visitasFormateadas);
        return visitasFormateadas;
    } catch (e) {
        throw Error("Error al obtener próximas visitas medicas: " + e.message);
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