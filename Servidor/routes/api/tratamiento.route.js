var express = require('express')
var router = express.Router()
var TratamientoController = require('../../controllers/tratamiento.controller');
var Authorization = require('../../auth/authorization');


// Authorize each API with middleware and map to the Controller Functions
/* GET tratamiento listing. */
router.get('/', function(req, res, next) {
    res.send('Llegaste a la ruta de  api/tratamiento.routes');
  });
router.post('/registration', TratamientoController.createTratamiento)
router.get('/tratamiento',Authorization, TratamientoController.getTratamiento)
router.get('/alltratamiento', TratamientoController.getAllTratamiento)
router.put('/:id/update', Authorization, TratamientoController.updateTratamiento)
router.delete('/:id/delete', Authorization, TratamientoController.removeTratamiento)



// Export the Router
module.exports = router;
