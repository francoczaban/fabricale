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
            
            let cantidadTotal = item.cantidad * cantidad;
            console.log('cantidadTotal material', cantidadTotal);

            const cantidadUsadaEnInventarioUnidad = convertirUnidades(cantidadTotal, item.unidadMedida, material.unidadMedida);

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
// exports.editarMaterialCompuesto = async(req, res) => {
//     const { id } = req.params;
//     const { nombre, codigo, cantidad, unidadMedida, materialesUsados } = req.body;

//     console.log(materialesUsados);
//     console.log(nombre);
//     console.log(codigo);
//     console.log(unidadMedida);
//     console.log(cantidad);
//     console.log('req body: ', req.body);

//     try {
//         const materialCompuesto = await MaterialCompuesto.findById(id).populate(
//             "materialesUsados.material"
//         );
//         console.log('Material Compuesto: ', materialCompuesto);
//         console.log('Materiales usados: ', materialCompuesto.materialesUsados);

//         if (!materialCompuesto) {
//             throw new Error(`Material compuesto con ID ${id} no encontrado`);
//         }

//         // Revertir stock de materiales usados anteriormente
//         for (const item of materialCompuesto.materialesUsados) {
//             const material = await Material.findById(item.material._id);
//             console.log('item materiales usados compuestos: ', item);

//             const cantidadRevertida = convertirUnidades(item.cantidad, item.unidadMedida, material.unidadMedida);

//             material.cantidad += cantidadRevertida;
//             await material.save();
//         }

//         // Verificar y descontar stock para los nuevos materiales usados
//         for (const item of materialesUsados) {
//             console.log('item: ', item);

//             // Asegurarnos de que 'material' esté presente en el objeto
//             if (!item.material) {
//                 throw new Error('El campo "material" es obligatorio en materialesUsados');
//             }

//             const material = await Material.findById(item.material); // Cambio de 'id' a 'material'
//             console.log('material: ', material);

//             if (!material) {
//                 throw new Error(`Material con ID ${item.material} no encontrado`);
//             }
//             let cantidadTotal = item.cantidad * cantidad;

//             const cantidadUsada = convertirUnidades(
//                 cantidadTotal,
//                 item.unidadMedida,
//                 material.unidadMedida
//             );

//             if (material.cantidad < cantidadUsada) {
//                 throw new Error(
//                     `Stock insuficiente para el material ${material.nombre}. Disponible: ${material.cantidad} ${material.unidadMedida}, requerido: ${cantidadUsada} ${material.unidadMedida}`
//                 );
//             }

//             material.cantidad -= cantidadUsada;
//             await material.save();
//         }

//         // Actualizar los datos del material compuesto
//         materialCompuesto.nombre = nombre || materialCompuesto.nombre;
//         materialCompuesto.codigo = codigo || materialCompuesto.codigo;
//         materialCompuesto.cantidad = cantidad || materialCompuesto.cantidad;
//         materialCompuesto.unidadMedida =
//             unidadMedida || materialCompuesto.unidadMedida;

//         // Verificamos que materialesUsados esté definido y sea un arreglo no vacío
//         if (Array.isArray(materialesUsados) && materialesUsados.length > 0) {
//             materialCompuesto.materialesUsados = materialesUsados;
//         } else {
//             throw new Error('Debe proporcionar al menos un material en materialesUsados');
//         }

//         await materialCompuesto.save();

//         logger.info(`Material Compuesto actualizado exitosamente: ${id}`);
//         res.status(200).json(materialCompuesto);
//     } catch (error) {
//         logger.error(`Error al actualizar material compuesto: ${error.stack}`);
//         res.status(500).json({ error: error.message });
//     }
// };

exports.editarMaterialCompuesto = async (req, res) => {
    const { id } = req.params;
    const { nombre, codigo, cantidad, unidadMedida, materialesUsados } = req.body;

    try {
        const materialCompuesto = await MaterialCompuesto.findById(id).populate("materialesUsados.material");

        if (!materialCompuesto) {
            throw new Error(`Material compuesto con ID ${id} no encontrado`);
        }

        // Revertir stock de los materiales usados anteriormente
        for (const item of materialCompuesto.materialesUsados) {
            const material = await Material.findById(item.material._id);

            const cantidadRevertida = convertirUnidades(
                item.cantidad * materialCompuesto.cantidad,
                item.unidadMedida,
                material.unidadMedida
            );

            material.cantidad += cantidadRevertida;
            await material.save();
        }

        // Verificar y descontar stock para los nuevos materiales usados
        for (const item of materialesUsados) {
            if (!item.material) {
                throw new Error('El campo "material" es obligatorio en materialesUsados');
            }

            const material = await Material.findById(item.material);

            if (!material) {
                throw new Error(`Material con ID ${item.material} no encontrado`);
            }

            // Multiplicamos la cantidad de ingrediente por la cantidad del material compuesto
            const cantidadTotal = item.cantidad * cantidad;

            const cantidadUsada = convertirUnidades(
                cantidadTotal,
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
        materialCompuesto.unidadMedida = unidadMedida || materialCompuesto.unidadMedida;

        if (!Array.isArray(materialesUsados) || materialesUsados.length === 0) {
            throw new Error('Debe proporcionar al menos un material en materialesUsados');
        }

        materialCompuesto.materialesUsados = materialesUsados;

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

    //console.log("1", req.params);

    const { id } = req.params;

    //console.log("2", id);

    try {
        const materialCompuesto = await MaterialCompuesto.findById(id).populate(
            "materialesUsados.material"
        );
        //console.log("3", materialCompuesto);

        if (!materialCompuesto) {
            throw new Error(`Material compuesto con ID ${id} no encontrado`);
        }

        // Revertir el stock de los materiales usados previamente
        for (const item of materialCompuesto.materialesUsados) {

            //console.log("4", item);
            const material = await Material.findById(item.material._id);

            if (material) {
                var cantidadFinal = item.cantidad * materialCompuesto.cantidad; 
                const cantidadRevertida = convertirUnidades(
                    cantidadFinal,
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