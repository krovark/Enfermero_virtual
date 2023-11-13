// Gettign the Newly created Mongoose Model we just created 
var Visitasmed = require('../models/visitasmed.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

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
        // Return the Userd list that was retured by the mongoose promise
        return Visitasmed;

    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services",e)
        throw Error('Error while Paginating Users');
    }
}

exports.createVisitasmed = async function (visitasmed){

    var newVisitasmed = new Visitasmed({
        visita: visitasmed.visita,
        fecha: visitasmed.fecha,
        hora: visitasmed.hora,
        direccion: visitasmed.direccion,
    });

    try {
        var savedVisitasmed = await newVisitasmed.save();
        var token = jwt.sign({ id: savedVisitasmed._id }, process.env.SECRET, { expiresIn: 86400});
        return token;
    } catch (e) {
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