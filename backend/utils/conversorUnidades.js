const logger = require("./logger");

// function convertirUnidades(cantidad, unidadOrigen, unidadDestino) {
//     logger.info(`Cantidad: ${cantidad} unidadOrigen: ${unidadOrigen} unidadDestino: ${unidadDestino}`);

//     if (unidadOrigen === unidadDestino) return cantidad;
//     const conversiones = {
//         KG: { GR: 1000 },
//         GR: { KG: 0.001 },
//         LT: { CC: 1000 },
//         CC: { LT: 0.001 },
//         // Añade aquí otras conversiones necesarias
//     };


//     if (conversiones[unidadOrigen] && conversiones[unidadOrigen][unidadDestino]) {
//         return cantidad * conversiones[unidadOrigen][unidadDestino];
//     }

//     throw new Error(`No se puede convertir de ${unidadOrigen} a ${unidadDestino}`);
// }

function convertirUnidades(cantidad, unidadOrigen, unidadDestino) {
    logger.info(`Cantidad: ${cantidad} unidadOrigen: ${unidadOrigen} unidadDestino: ${unidadDestino}`);

    // Si las unidades son iguales, no se necesita conversión
    if (unidadOrigen === unidadDestino) {
        return cantidad;
    }

    const conversiones = {
        KG: { GR: 1000 },
        GR: { KG: 0.001 },
        LT: { CC: 1000 },
        CC: { LT: 0.001 },
        // Añade aquí otras conversiones necesarias
    };

    if (conversiones[unidadOrigen] && conversiones[unidadOrigen][unidadDestino]) {
        return cantidad * conversiones[unidadOrigen][unidadDestino];
    }

    throw new Error(`No se puede convertir de ${unidadOrigen} a ${unidadDestino}`);
}


module.exports = { convertirUnidades };