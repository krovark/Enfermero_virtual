/**ROUTE USER APIs. */
var express = require('express')

var router = express.Router();
var users = require('./api/user.route');
var visitasmed = require('./api/visitasmed.route');
var tratamiento = require('./api/tratamiento.route');
var historial = require('./api/historial.route');

router.use('/users', users);
router.use('/visitasmed', visitasmed);
router.use('/tratamiento', tratamiento);
router.use('/historial', historial);

module.exports = router;
