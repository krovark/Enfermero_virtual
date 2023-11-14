var TratamientoService = require('../services/tratamiento.service');

_this = this;

// Obtener lista de tratamiento
exports.getTratamiento = async function (req, res, next) {
    var page = req.query.page ? req.query.page : 1;
    var limit = req.query.limit ? req.query.limit : 10;

    try {
        var Tratamiento = await TratamientoService.getTratamiento({}, page, limit);
        return res.status(200).json({ status: 200, data: Tratamiento, message: "Tratamiento obtenido exitosamente" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

// Crear tratamiento
exports.createTratamiento = async function (req, res, next) {
    var newTratamiento = req.body; // Asumimos que req.body ya contiene los campos necesarios

    try {
        var createdTratamiento = await TratamientoService.createTratamiento(newTratamiento);
        return res.status(201).json({ token: createdTratamiento, message: "Tratamiento creado exitosamente" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: "Error al crear el tratamiento" });
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
    try {
        var allTratamiento = await TratamientoService.getAllTratamiento();
        return res.status(200).json({ status: 200, data: allTratamiento, message: "Todos los tratamientos obtenidos exitosamente" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
