const mongoose = require("mongoose");
const Producto = require("../models/Producto");
const Material = require("../models/Material");
const Formula = require("../models/Formula");
const MaterialCompuesto = require("../models/MaterialCompuesto");
const logger = require("../utils/logger");

// Crear un nuevo forula con manejo de transacción
exports.crearFormula = async (req, res) => {
    try {
        const { nombre, unidadMedida, descripcion, materialesUsados, materialesCompuestosUsados, categoria, categoriaNombre } = req.body;

        logger.info(`Intentando crear formula: ${nombre}`);

        // Crear la nueva formula
        const formula = new Formula({
            nombre,
            unidadMedida,
            descripcion,
            categoria,
            categoriaNombre,
            materialesUsados,
            materialesCompuestosUsados,
        });
        
        console.log('Formula: ', formula);

        await formula.save();
        logger.info(`Formula creada exitosamente: ${nombre}`);
        res.status(201).json(formula);
    } catch (error) {
        logger.error(`Error al crear la Formula: ${error.stack}`);
        res.status(500).json({ error: error.message });
    }
};


exports.obtenerFormulas = async (req, res) => {
    try {
        const formulas = await Formula.find()
            .populate("materialesUsados.material", "nombre cantidad unidadMedida")
            .populate("materialesCompuestosUsados.materialCompuesto", "nombre cantidad unidadMedida");

        res.status(200).json(formulas);
    } catch (error) {
        logger.error(`Error al obtener las formulas: ${error.stack}`);
        res.status(500).json({ error: error.message });
    }
};