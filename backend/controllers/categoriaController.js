const mongoose = require("mongoose");
const Categoria = require("../models/Categoria");
const logger = require("../utils/logger");

// Crear un material con manejo de transacción
exports.crearCategoria = async (req, res) => {
    try {
        
        // Crear un nuevo material si no existe
        const categoria = new Categoria(req.body);
        await categoria.save();
        logger.info(`Categoria creado exitosamente: ${categoria.nombre}`);
        res.status(201).json(categoria);
    } catch (error) {
        logger.error(`Error al crear categoria: ${error.stack}`);
        res.status(400).json({ error: error.message });
    }
};

// Obtener categorias (sin cambios, no necesita transacción)
exports.obtenerCategoria = async (req, res) => {
    try {
        const categoria = await Categoria.find();
        res.json(categoria);
    } catch (error) {
        logger.error(`Error al obtener categoria: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un categoria con manejo de transacción
exports.actualizarCategoria = async (req, res) => {
    try {
        const categoria = await Categoria.findById(req.params.id);

        if (!categoria) {
            throw new Error("Categoria no encontrada");
        }

        // Actualizar campos del categoria
        Object.assign(categoria, req.body);
        await categoria.save();

        logger.info(`Categoria actualizado exitosamente: ${categoria.nombre}`);
        res.json(categoria);
    } catch (error) {
        logger.error(`Error al actualizar categoria: ${error.stack}`);
        res.status(400).json({ error: error.message });
    }
};

// Eliminar un material
exports.eliminarCategoria = async (req, res) => {
    try {
        const categoria = await Categoria.findById(req.params.id);

        if (!categoria) {
            return res.status(404).json({ message: "Categoria no encontrada" });
        }

        await Categoria.findByIdAndDelete(req.params.id);
        logger.info(`Categoria eliminada exitosamente: ${categoria.nombre}`);
        res.status(200).json({ message: "Categoria eliminada correctamente" });
    } catch (error) {
        logger.error(`Error al eliminar categoria: ${error.stack}`);
        res.status(500).json({ error: error.message });
    }
};
