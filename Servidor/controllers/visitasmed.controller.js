var VisitasmedService = require('../services/visitasmed.service')
const moment = require('moment');

_this = this;

// Obtener lista de visitas medicas
exports.getVisitasmed = async function (req, res, next) {
    var page = req.query.page ? req.query.page : 1;
    var limit = req.query.limit ? req.query.limit : 10;

    try {
        var Visitasmed = await VisitasmedService.getVisitasmed({}, page, limit);
        return res.status(200).json({ status: 200, data: Visitasmed, message: "Visitas Medicas obtenidas exitosamente" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}


exports.getProximasVisitasController = async function (req, res, next) {
    try {
        console.log("UserID en el controlador: ", req.userId);
        var proximasVisitas = await VisitasmedService.getProximasVisitasmed(req.userId);
        res.status(200).json({ status: 200, data: proximasVisitas, message: "Próximas visitas medicas obtenidas exitosamente" });
    } catch (e) {
        res.status(400).json({ status: 400, message: "Error al obtener próximas visitas medicas: " + e.message });
    }
};



// Crear visita medica
exports.createVisitasmed = async function (req, res, next) {
    var newVisitasmed = req.body; 
    newVisitasmed.userID = req.userId;

    try {
        console.log(newVisitasmed);
        newVisitasmed.fecha = moment(newVisitasmed.fecha, 'DD/MM/YYYY').toDate();
        var createdVisitasmed = await VisitasmedService.createVisitasmed(newVisitasmed);
    
        return res.status(201).json({ token: createdVisitasmed, message: "Visita medica creada exitosamente" });
    } catch (e) {
        console.error("Error",e);
        return res.status(400).json({ status: 400, message: "Error al crear la visita medica" });
    }
}

// Actualizar visita medica
exports.updateVisitasmed = async function (req, res, next) {
    var visitasmedId = req.params.id; // Asumiendo que el ID se envía como parámetro
    var visitasmedData = req.body;

    try {
        var updatedVisitasmed = await VisitasmedService.updateVisitasmed(visitasmedId, visitasmedData);
        return res.status(200).json({ status: 200, data: updatedVisitasmed, message: "Visita medica actualizada exitosamente" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

// Eliminar visita medica
exports.removeVisitasmed = async function (req, res, next) {
    var id = req.params.id; // Asumiendo que el ID se envía como parámetro

    try {
        await VisitasmedService.deleteVisitasmed(id);
        return res.status(200).json({ status: 200, message: "Visita medica eliminada exitosamente" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

// Obtener todas las visitas medicas
exports.getAllVisitasmed = async function (req, res, next) {
    try {
        var allVisitasmed = await VisitasmedService.getAllVisitasmed();
        return res.status(200).json({ status: 200, data: allVisitasmed, message: "Todas las visitas medicas obtenidas exitosamente" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
