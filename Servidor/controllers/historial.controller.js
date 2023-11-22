const HistorialService = require('../services/historial.service');

// Obtener lista de historial
exports.getHistorial = async function (req, res, next) {
    try {
        var idUser = req.params.idUser;

        if (!idUser) {
            return res.status(400).json({ status: 400, message: "ID de usuario no proporcionado" });
        }

        var page = req.query.page || 1;
        var limit = req.query.limit || 10;

        var historial = await HistorialService.getHistorial(idUser, page, limit);
        return res.status(200).json({ status: 200, data: historial, message: "Historial obtenido exitosamente de " + idUser });
    } catch (e) {
        console.error("Error en getHistorial controller:", e);
        return res.status(500).json({ status: 500, message: "Error interno del servidor", error: e.message });
    }
};



// Crear historial
exports.createHistorial = async function (req, res, next) {
    var newHistorial = req.body;

    try {
        var createdHistorial = await HistorialService.createHistorial(newHistorial);
        return res.status(201).json({ status: 201, data: createdHistorial, message: "Historial creado exitosamente" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: "Error al crear el historial" });
    }
};

// Actualizar historial
exports.updateHistorial = async function (req, res, next) {
    var historialId = req.params.id;
    var historialData = req.body;

    try {
        var updatedHistorial = await HistorialService.updateHistorial(historialId, historialData);
        return res.status(200).json({ status: 200, data: updatedHistorial, message: "Historial actualizado exitosamente" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

// Eliminar historial
exports.removeHistorial = async function (req, res, next) {
    var id = req.params.id;

    try {
        await HistorialService.deleteHistorial(id);
        return res.status(200).json({ status: 200, message: "Historial eliminado exitosamente" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

// Obtener todos los historiales
exports.getAllHistorial = async function (req, res, next) {
    try {
        var allHistorial = await HistorialService.getAllHistorial();
        return res.status(200).json({ status: 200, data: allHistorial, message: "Todos los historiales obtenidos exitosamente" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};
