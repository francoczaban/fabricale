const Material = require("../models/Material");
const MaterialCompuesto = require("../models/MaterialCompuesto");

// Crear un nuevo material compuesto
exports.crearMaterialCompuesto = async (req, res) => {
    const { nombre, codigo, cantidad, unidadMedida, materialesUsados } = req.body;

    try {
        // Verificar que materialesUsados es un array antes de iterar
        if (!Array.isArray(materialesUsados)) {
            return res.status(400).json({ error: "'materialesUsados' debe ser un array" });
        }

        // Verificar si hay suficiente stock de cada material usado
        for (const item of materialesUsados) {
            const material = await Material.findById(item.material);

            if (!material) {
                return res.status(404).json({ error: `Material con ID ${item.material} no encontrado` });
            }

            if (material.cantidad < item.cantidad) {
                return res.status(400).json({
                    error: `Stock insuficiente para el material ${material.nombre}. Disponible: ${material.cantidad}, requerido: ${item.cantidad}`
                });
            }
        }

        // Descontar el stock de cada material usado
        for (const item of materialesUsados) {
            await Material.findByIdAndUpdate(item.material, {
                $inc: { cantidad: -item.cantidad }
            });
        }

        // Crear el nuevo material compuesto
        const materialCompuesto = new MaterialCompuesto({
            nombre,
            codigo,
            cantidad,
            unidadMedida,
            materialesUsados
        });

        await materialCompuesto.save();
        res.status(201).json(materialCompuesto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.obtenerMaterialesCompuestos = async (req, res) => {
    try {
        const materialesCompuestos = await MaterialCompuesto.find().populate("materialesUsados.material");
        res.status(200).json(materialesCompuestos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

