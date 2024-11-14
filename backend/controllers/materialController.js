const Material = require("../models/Material");
const logger = require("../utils/logger");

exports.crearMaterial = async (req, res) => {
    console.log("body: ", req.body)
    try {
        const material = new Material(req.body);
        await material.save();
        logger.info(`Material creado exitosamente: ${nombre}`);
        res.status(201).json(material);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.obtenerMateriales = async (req, res) => {
    try {
        const materiales = await Material.find();
        res.json(materiales);
    } catch (error) {
        logger.error(`Error al crear material: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

exports.actualizarMaterial = async (req, res) => {
    try {
        const material = await Material.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!material) return res.status(404).json({ error: "Material no encontrado" });
        res.json(material);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.eliminarMaterial = async (req, res) => {
    try {
        const material = await Material.findByIdAndDelete(req.params.id);
        if (!material) return res.status(404).json({ error: "Material no encontrado" });
        res.json({ message: "Material eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
