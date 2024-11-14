const Material = require("../models/Material");
const MaterialCompuesto = require("../models/MaterialCompuesto");
const { convertirUnidades } = require("../utils/conversorUnidades");
const logger = require("../utils/logger");

// Crear un nuevo material compuesto
exports.crearMaterialCompuesto = async (req, res) => {
    const { nombre, codigo, cantidad, unidadMedida, materialesUsados } = req.body;

    try {
        // Verificación de existencia y stock suficiente en cada material
        for (const item of materialesUsados) {
            const material = await Material.findById(item.material);

            if (!material) {
                return res.status(404).json({ error: `Material con ID ${item.material} no encontrado` });
            }

            // Convertir la cantidad a la misma unidad antes de comparar y descontar
            const cantidadUsadaEnInventarioUnidad = convertirUnidades(item.cantidad, item.unidadMedida, material.unidadMedida);

            if (material.cantidad < cantidadUsadaEnInventarioUnidad) {
                return res.status(400).json({
                    error: `Stock insuficiente para el material ${material.nombre}. Disponible: ${material.cantidad} ${material.unidadMedida}, requerido: ${cantidadUsadaEnInventarioUnidad} ${material.unidadMedida}`
                });
            }
        }




        // Descuento de inventario en la unidad correspondiente
        for (const item of materialesUsados) {
            const material = await Material.findById(item.material);  // Obtener nuevamente el material

            if (!material) {
                logger.error(`Material con ID ${item.material} no encontrado en el proceso de descuento`);
                return res.status(404).json({ error: `Material con ID ${item.material} no encontrado` });
            }

            const cantidadUsadaEnInventarioUnidad = convertirUnidades(item.cantidad, item.unidadMedida, material.unidadMedida);
            await Material.findByIdAndUpdate(item.material, {
                $inc: { cantidad: -cantidadUsadaEnInventarioUnidad }
            });
        }

        // Crear el material compuesto después de descontar los materiales
        const materialCompuesto = new MaterialCompuesto({
            nombre,
            codigo,
            cantidad,
            unidadMedida,
            materialesUsados
        });

        await materialCompuesto.save();
        logger.info(`Material Compuesto creado exitosamente: ${nombre}`);
        res.status(201).json(materialCompuesto);
    } catch (error) {
        logger.error(`Error al crear material compuesto: ${error.stack}`);
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



