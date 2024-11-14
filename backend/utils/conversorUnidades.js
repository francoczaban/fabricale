const logger = require("./logger");

function convertirUnidades(cantidad, unidadOrigen, unidadDestino) {
    logger.info(`Cantidad: ${cantidad} unidadOrigen: ${unidadOrigen} unidadDestino: ${unidadDestino}`);
    const conversiones = {
        KG: { GR: 1000 },
        GR: { KG: 0.001 },
        L: { ML: 1000 },
        ML: { L: 0.001 },
        // Añade aquí otras conversiones necesarias
    };

    if (unidadOrigen === unidadDestino) return cantidad;
    if (conversiones[unidadOrigen] && conversiones[unidadOrigen][unidadDestino]) {
        return cantidad * conversiones[unidadOrigen][unidadDestino];
    }
    
    throw new Error(`No se puede convertir de ${unidadOrigen} a ${unidadDestino}`);
}

module.exports = { convertirUnidades };



