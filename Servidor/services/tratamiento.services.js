// Gettign the Newly created Mongoose Model we just created 
var Tratamiento = require('../models/tratamiento.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the User List
exports.getTratamiento = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        console.log("Query",query)
        var Tratamiento = await Tratamiento.paginate(query, options)
        // Return the tratamiento list that was retured by the mongoose promise
        return Tratamiento;

    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services",e)
        throw Error('Error while Paginating Users');
    }
}

exports.createTratamiento = async function (tratamiento){

    var newTratamiento = new Tratamiento({
        tratamiento: tratamiento.tratamiento,
        horario: tratamiento.horario,
        notas: tratamiento.notas,
        alarma: tratamiento.alarma,
        frecuencia: tratamiento.frecuencia,
    });

    try {
        var savedTratamiento = await newTratamiento.save();
        var token = jwt.sign({ id: savedTratamiento._id }, process.env.SECRET, { expiresIn: 86400});
        return token;
    } catch (e) {
        throw Error("Error al crear Tratamiento");
    }
}

exports.updateTratamiento = async function (tratamientoId, tratamientoData){
    try{
        var updatedTratamiento = await Tratamiento.findByIdAndUpdate(tratamientoId, tratamientoData, { new:true });
        return updatedTratamiento;
    } catch (e) {
        throw Error("Error al actualizar los tratamientos");
    }
}

exports.deleteTratamiento = async function (id) {
    console.log(id)
    // Delete the tratamientos
    try {
        var deleted = await Tratamiento.remove({
            _id: id
        })
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("Tratamiento Could not be deleted")
        }
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the Tratamiento")
    }
}

exports.getAllTratamiento = async function () {
    try {
        var tratamiento = await Tratamiento.find({});
        return tratamiento;
    } catch (e) {
        throw Error('Error al obtener todos los tratamientos');
    }
}