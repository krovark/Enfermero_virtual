var express = require('express')
var router = express.Router()
var VisitasmedController = require('../../controllers/visitasmed.controller');
var Authorization = require('../../auth/authorization');


// Authorize each API with middleware and map to the Controller Functions
/* GET visitasmed listing. */
router.get('/', function(req, res, next) {
    res.send('Llegaste a la ruta de  api/visitasmed.routes');
  });
router.post('/registration',Authorization, VisitasmedController.createVisitasmed)
router.get('/visitasmed',Authorization, VisitasmedController.getVisitasmed)
router.get('/allvisitasmed',Authorization, VisitasmedController.getAllVisitasmed)
router.put('/:id/update', Authorization, VisitasmedController.updateVisitasmed)
router.delete('/:id/delete', Authorization, VisitasmedController.removeVisitasmed)

router.get('/proximas-visitas',Authorization ,VisitasmedController.getProximasVisitasController);


// Export the Router
module.exports = router;
