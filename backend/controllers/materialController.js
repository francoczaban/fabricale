const mongoose = require("mongoose");
const Material = require("../models/Material");
const logger = require("../utils/logger");

// Crear un material con manejo de transacción
exports.crearMaterial = async (req, res) => {
    try {
        const materialExistente = await Material.findOne({ nombre: req.body.nombre, codigo: req.body.codigo });

        if (materialExistente) {
            // Si el material ya existe, solo se suma la cantidad
            materialExistente.cantidad += req.body.cantidad;
            await materialExistente.save();
            logger.info(`Material existente actualizado exitosamente: ${materialExistente.nombre}`);
            return res.status(200).json(materialExistente);
        }

        // Crear un nuevo material si no existe
        const material = new Material(req.body);
        await material.save();
        logger.info(`Material creado exitosamente: ${material.nombre}`);
        res.status(201).json(material);
    } catch (error) {
        logger.error(`Error al crear material: ${error.stack}`);
        res.status(400).json({ error: error.message });
    }
};

// Obtener materiales (sin cambios, no necesita transacción)
exports.obtenerMateriales = async (req, res) => {
    try {
        const materiales = await Material.find();
        res.json(materiales);
    } catch (error) {
        logger.error(`Error al obtener materiales: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un material con manejo de transacción
exports.actualizarMaterial = async (req, res) => {
    try {
        const material = await Material.findById(req.params.id);

        if (!material) {
            throw new Error("Material no encontrado");
        }

        // Actualizar campos del material
        Object.assign(material, req.body);
        await material.save();

        logger.info(`Material actualizado exitosamente: ${material.nombre}`);
        res.json(material);
    } catch (error) {
        logger.error(`Error al actualizar material: ${error.stack}`);
        res.status(400).json({ error: error.message });
    }
};

// Eliminar un material
exports.eliminarMaterial = async (req, res) => {
    try {
        const material = await Material.findById(req.params.id);

        if (!material) {
            return res.status(404).json({ message: "Material no encontrado" });
        }

        await Material.findByIdAndDelete(req.params.id);
        logger.info(`Material eliminado exitosamente: ${material.nombre}`);
        res.status(200).json({ message: "Material eliminado correctamente" });
    } catch (error) {
        logger.error(`Error al eliminar material: ${error.stack}`);
        res.status(500).json({ error: error.message });
    }
};
