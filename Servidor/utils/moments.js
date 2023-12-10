const moment = require('moment');

function formatFecha(fecha) {
    return moment(fecha).format('DD/MM/YYYY');
}

function parseFecha(fechaString) {
    return moment(fechaString, 'DD/MM/YYYY').toDate();
}

module.exports = {
    formatFecha,
    parseFecha
};
