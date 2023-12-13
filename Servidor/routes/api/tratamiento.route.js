const express = require('express');
const router = express.Router();
const TratamientoController = require('../../controllers/tratamiento.controller');
const Authorization = require('../../auth/authorization');

router.post('/:idPersona/create', Authorization, TratamientoController.createTratamiento);
router.get('/:idPersona/:idTratamiento/get', Authorization, TratamientoController.getTratamiento);
router.put('/:idPersona/:idTratamiento/update', Authorization, TratamientoController.updateTratamiento);
router.delete('/:idPersona/:idTratamiento/delete', Authorization, TratamientoController.removeTratamiento);
router.get('/tratamientos', Authorization, TratamientoController.getTratamiento);

router.get('/proximos-tratamientos', Authorization ,TratamientoController.getProximosTratamientos);

router.get('/historial', Authorization, TratamientoController.getTratamientosFinalizados);

module.exports = router;
