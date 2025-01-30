const mongoose = require("mongoose");
const Material = require("../models/Material");
const MaterialCompuesto = require("../models/MaterialCompuesto");
const { convertirUnidades } = require("../utils/conversorUnidades");
const logger = require("../utils/logger");
const { Console } = require("winston/lib/winston/transports");

// Crear un nuevo material compuesto
exports.crearMaterialCompuesto = async(req, res) => {
    const { nombre, codigo, cantidad, unidadMedida, materialesUsados, alertaStock } = req.body;

    try {
        for (const item of materialesUsados) {
            const material = await Material.findById(item.material);

            if (!material) {
                throw new Error(`Material con ID ${item.material} no encontrado`);
            }

            const cantidadUsadaEnInventarioUnidad = convertirUnidades(item.cantidad, item.unidadMedida, material.unidadMedida);

            if (material.cantidad < cantidadUsadaEnInventarioUnidad) {
                throw new Error(
                    `Stock insuficiente para el material ${material.nombre}. Disponible: ${material.cantidad} ${material.unidadMedida}, requerido: ${cantidadUsadaEnInventarioUnidad} ${material.unidadMedida}`
                );
            }

            material.cantidad -= cantidadUsadaEnInventarioUnidad;
            await material.save();
        }

        const materialCompuesto = new MaterialCompuesto({
            nombre,
            codigo,
            cantidad,
            unidadMedida,
            materialesUsados,
            alertaStock,
        });

        await materialCompuesto.save();

        logger.info(`Material Compuesto creado exitosamente: ${nombre}`);
        res.status(201).json(materialCompuesto);
    } catch (error) {
        logger.error(`Error al crear material compuesto: ${error.stack}`);
        res.status(500).json({ error: error.message });
    }
};

// Traer todos los materiales compuestos
exports.obtenerMaterialesCompuestos = async(req, res) => {
    try {
        const materialesCompuestos = await MaterialCompuesto.find().populate(
            "materialesUsados.material"
        );
        res.status(200).json(materialesCompuestos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Editar un material compuesto con transacción
exports.editarMaterialCompuesto = async(req, res) => {
    const { id } = req.params;
    const { nombre, codigo, cantidad, unidadMedida, materialesUsados } = req.body;

    try {
        const materialCompuesto = await MaterialCompuesto.findById(id).populate(
            "materialesUsados.material"
        );

        if (!materialCompuesto) {
            throw new Error(`Material compuesto con ID ${id} no encontrado`);
        }

        // Revertir stock de materiales usados anteriormente
        for (const item of materialCompuesto.materialesUsados) {
            const material = await Material.findById(item.material._id);

            const cantidadRevertida = convertirUnidades(
                item.cantidad,
                item.unidadMedida,
                material.unidadMedida
            );
            material.cantidad += cantidadRevertida;
            await material.save();
        }

        // Verificar y descontar stock para los nuevos materiales usados
        for (const item of materialesUsados) {
            const material = await Material.findById(item.material);

            if (!material) {
                throw new Error(`Material con ID ${item.material} no encontrado`);
            }

            const cantidadUsada = convertirUnidades(
                item.cantidad,
                item.unidadMedida,
                material.unidadMedida
            );

            if (material.cantidad < cantidadUsada) {
                throw new Error(
                    `Stock insuficiente para el material ${material.nombre}. Disponible: ${material.cantidad} ${material.unidadMedida}, requerido: ${cantidadUsada} ${material.unidadMedida}`
                );
            }

            material.cantidad -= cantidadUsada;
            await material.save();
        }

        // Actualizar los datos del material compuesto
        materialCompuesto.nombre = nombre || materialCompuesto.nombre;
        materialCompuesto.codigo = codigo || materialCompuesto.codigo;
        materialCompuesto.cantidad = cantidad || materialCompuesto.cantidad;
        materialCompuesto.unidadMedida =
            unidadMedida || materialCompuesto.unidadMedida;
        materialCompuesto.materialesUsados =
            materialesUsados || materialCompuesto.materialesUsados;

        await materialCompuesto.save();

        logger.info(`Material Compuesto actualizado exitosamente: ${id}`);
        res.status(200).json(materialCompuesto);
    } catch (error) {
        logger.error(`Error al actualizar material compuesto: ${error.stack}`);
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un material compuesto con transacción
exports.eliminarMaterialCompuesto = async(req, res) => {

    const { id } = req.params;

    try {
        const materialCompuesto = await MaterialCompuesto.findById(id).populate(
            "materialesUsados.material"
        );

        if (!materialCompuesto) {
            throw new Error(`Material compuesto con ID ${id} no encontrado`);
        }

        // Revertir el stock de los materiales usados previamente
        for (const item of materialCompuesto.materialesUsados) {
            const material = await Material.findById(item.material._id);

            if (material) {
                const cantidadRevertida = convertirUnidades(
                    item.cantidad,
                    item.unidadMedida,
                    material.unidadMedida
                );

                material.cantidad += cantidadRevertida;
                await material.save();
            } else {
                throw new Error(
                    `Material asociado con ID ${item.material._id} no encontrado`
                );
            }
        }

        // Eliminar el material compuesto
        await MaterialCompuesto.findByIdAndDelete(id);

        logger.info(`Material Compuesto eliminado exitosamente: ${id}`);
        res
            .status(200)
            .json({ message: "Material compuesto eliminado exitosamente" });
    } catch (error) {
        logger.error(`Error al eliminar material compuesto: ${error.stack}`);
        res.status(500).json({ error: error.message });
    }
};