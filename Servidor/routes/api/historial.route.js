var express = require('express');
var router = express.Router();
var HistorialController = require('../../controllers/historial.controller');
var Authorization = require('../../auth/authorization');

// Default route, just for testing
router.get('/', function (req, res, next) {
    res.send('You have reached the api/historial.routes route.');
});

// Create historial
router.post('/create', Authorization, HistorialController.createHistorial);

// Get historial by user ID
router.get('/:idUser',  Authorization,HistorialController.getHistorial);

// Delete historial by user ID
router.delete('/:idUser/delete', Authorization, HistorialController.removeHistorial);

// Export the Router
module.exports = router;
