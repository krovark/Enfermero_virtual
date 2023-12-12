const express = require('express');
const router = express.Router();
const TratamientoController = require('../../controllers/tratamiento.controller');
const Authorization = require('../../auth/authorization');

router.post('/:idPersona/create', Authorization, TratamientoController.createTratamiento);
// router.get('/:idPersona', Authorization, TratamientoController.getAllTratamiento);
router.get('/:idPersona/:idTratamiento/get', Authorization, TratamientoController.getTratamiento);
router.put('/:idPersona/:idTratamiento/update', Authorization, TratamientoController.updateTratamiento);
router.delete('/:idPersona/:idTratamiento/delete', Authorization, TratamientoController.removeTratamiento);
router.get('/tratamientos', Authorization, TratamientoController.getTratamiento);

module.exports = router;
