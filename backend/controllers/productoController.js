const mongoose = require("mongoose");
const Producto = require("../models/Producto");
const Material = require("../models/Material");
const MaterialCompuesto = require("../models/MaterialCompuesto");
const logger = require("../utils/logger");
const { convertirUnidades } = require("../utils/conversorUnidades");


// Crear un nuevo producto con manejo de transacción
exports.crearProducto = async(req, res) => {
    try {
        const { nombre, codigo, cantidad, unidadMedida, alertaStock, materialesUsados, materialesCompuestosUsados } = req.body;

        logger.info(`Intentando crear producto: ${nombre}, código: ${codigo}`);

        // Verificar y descontar stock de cada material básico usado
        for (const item of materialesUsados) {
            const material = await Material.findById(item.material);
            if (!material) {
                throw new Error(`Material con ID ${item.material} no encontrado`);
            }

            const cantidadNecesaria = convertirUnidades(item.cantidad, item.unidadMedida, material.unidadMedida);

            if (material.cantidad < cantidadNecesaria) {
                throw new Error(`Stock insuficiente para el material ${material.nombre}. Disponible: ${material.cantidad} ${material.unidadMedida}, requerido: ${cantidadNecesaria} ${material.unidadMedida}`);
            }

            // Descontar el stock con la cantidad convertida
            material.cantidad -= cantidadNecesaria;
            console.log('Material guardado en productos: ', material)
            await material.save();
        }

        // Verificar y descontar stock de cada material compuesto usado
        for (const item of materialesCompuestosUsados) {
            console.log('item: ', materialesCompuestosUsados);
            const materialCompuesto = await MaterialCompuesto.findById(item.materialCompuesto);
            if (!materialCompuesto) {
                throw new Error(`Material compuesto con ID ${item.materialCompuesto} no encontrado`);
            }

            const cantidadNecesariaCompuesto = convertirUnidades(item.cantidad, item.unidadMedida, materialCompuesto.unidadMedida);

            if (materialCompuesto.cantidad < cantidadNecesariaCompuesto) {
                throw new Error(`Stock insuficiente para el material compuesto ${materialCompuesto.nombre}. Disponible: ${materialCompuesto.cantidad} ${materialCompuesto.unidadMedida}, requerido: ${cantidadNecesariaCompuesto} ${materialCompuesto.unidadMedida}`);
            }

            // Descontar el stock con la cantidad convertida
            materialCompuesto.cantidad -= cantidadNecesariaCompuesto;
            await materialCompuesto.save();
        }

        // Crear el nuevo producto
        const producto = new Producto({
            nombre,
            codigo,
            cantidad,
            unidadMedida,
            alertaStock,
            materialesUsados,
            materialesCompuestosUsados,
        });
        console.log('Producto: ', producto);

        await producto.save();
        logger.info(`Producto creado exitosamente: ${nombre}`);
        res.status(201).json(producto);
    } catch (error) {
        logger.error(`Error al crear producto: ${error.stack}`);
        res.status(500).json({ error: error.message });
    }
};


// Obtener productos con manejo de transacción
exports.obtenerProductos = async(req, res) => {
    try {
        const productos = await Producto.find()
            .populate("materialesUsados.material", "nombre cantidad unidadMedida")
            .populate("materialesCompuestosUsados.materialCompuesto", "nombre cantidad unidadMedida");

        res.status(200).json(productos);
    } catch (error) {
        logger.error(`Error al obtener productos: ${error.stack}`);
        res.status(500).json({ error: error.message });
    }
};

// Editar un producto con manejo de transacción
exports.editarProducto = async(req, res) => {
    try {
        const { id } = req.params;
        const producto = await Producto.findById(id);

        if (!producto) {
            throw new Error("Producto no encontrado");
        }

        // Verificar stock de materiales y materiales compuestos antes de la actualización
        for (const item of req.body.materiales) {
            const material = await Material.findById(item.materialId);
            if (!material || material.cantidad < item.cantidad) {
                throw new Error(`Stock insuficiente para el material: ${material?.nombre || "Desconocido"}`);
            }
        }

        for (const item of req.body.materialesCompuestos) {
            const materialCompuesto = await MaterialCompuesto.findById(item.materialCompuestoId);
            if (!materialCompuesto || materialCompuesto.cantidad < item.cantidad) {
                throw new Error(`Stock insuficiente para el material compuesto: ${materialCompuesto?.nombre || "Desconocido"}`);
            }
        }

        // Actualizar el producto
        Object.assign(producto, req.body);
        await producto.save();

        // Actualizar el stock de materiales y materiales compuestos
        for (const item of req.body.materiales) {
            const material = await Material.findById(item.materialId);
            material.cantidad -= item.cantidad;
            await material.save();
        }

        for (const item of req.body.materialesCompuestos) {
            const materialCompuesto = await MaterialCompuesto.findById(item.materialCompuestoId);
            materialCompuesto.cantidad -= item.cantidad;
            await materialCompuesto.save();
        }

        logger.info(`Producto actualizado exitosamente: ${producto.nombre}`);
        res.json(producto);
    } catch (error) {
        logger.error(`Error al editar producto: ${error.stack}`);
        res.status(400).json({ error: error.message });
    }
};

// Eliminar un producto con manejo de transacción
exports.eliminarProducto = async(req, res) => {
    // const session = await mongoose.startSession();
    // session.startTransaction();
    console.log('antes de entrar al try');
    try {
        const { id } = req.params;
        console.log('ID:', id);
        // const producto = await Producto.findById(id).session(session);
        const producto = await Producto.findById(id);
        console.log('Producto(BASE): ', producto);
        console.log('Producto.Materiales usados es: ', producto.materialesUsados);

        if (!producto) {
            throw new Error("Producto no encontrado");
        }

        // Actualizar el stock de materiales y materiales compuestos utilizados en el producto
        for (const item of producto.materialesUsados) {

            const material = await Material.findById(item.material);

            if (!material) {
                throw new Error(`Material con ID ${item.material} no encontrado`);
            }

            const cantidadUsadaEnInventarioUnidad = convertirUnidades(item.cantidad, item.unidadMedida, material.unidadMedida);
            console.log('materiales usados: ', material);
            console.log('Item: ', item);


            if (material.cantidad < cantidadUsadaEnInventarioUnidad) {
                throw new Error(
                    `Stock insuficiente para el material ${material.nombre}. Disponible: ${material.cantidad} ${material.unidadMedida}, requerido: ${cantidadUsadaEnInventarioUnidad} ${material.unidadMedida}`
                );
            }
            console.log('Cantidad antes de restar: ', material.cantidad);


            material.cantidad += cantidadUsadaEnInventarioUnidad;

            console.log('Cantidad despues de restar', material.cantidad);
            console.log('unidadcompuesto: ', cantidadUsadaEnInventarioUnidad);

            await material.save();
        }

        for (const item of producto.materialesCompuestosUsados) {

            const materialCompuesto = await MaterialCompuesto.findById(item.materialCompuesto);
            console.log('Materiales compuestos usados: ', materialCompuesto);
            console.log('Item: ', item);

            if (!materialCompuesto) {
                throw new Error(`Material Compuesto con ID ${item.materialCompuesto} no encontrado`);
            }

            const unidadCompuesto = convertirUnidades(item.cantidad, item.unidadMedida, materialCompuesto.unidadMedida);

            if (materialCompuesto.cantidad < unidadCompuesto) {
                throw new Error(
                    `Stock insuficiente para el material Compuesto ${materialCompuesto.nombre}. Disponible: ${materialCompuesto.cantidad} ${materialCompuesto.unidadMedida}, requerido: ${unidadCompuesto} ${materialCompuesto.unidadMedida}`
                );
            }

            console.log('Cantidad antes de restar', materialCompuesto.cantidad);


            // materialCompuesto.cantidad += item.cantidad;
            materialCompuesto.cantidad += unidadCompuesto;

            console.log('Cantidad despues de restar', materialCompuesto.cantidad);
            console.log('unidadcompuesto: ', unidadCompuesto);

            await materialCompuesto.save();
        }

        // Eliminar el producto
        await Producto.findByIdAndDelete(id);

        // await session.commitTransaction();
        // session.endSession();
        logger.info(`Producto eliminado exitosamente: ${producto.nombre}`);
        res.json({ message: "Producto eliminado correctamente" });
    } catch (error) {
        // await session.abortTransaction();
        // session.endSession();
        logger.error(`Error al eliminar producto: ${error.stack}`);
        res.status(500).json({ error: error.message });
    }
};

// // Eliminar un producto con manejo de transacción
// exports.eliminarProducto = async(req, res) => {
//     const session = await mongoose.startSession();
//     session.startTransaction();
//     console.log('antes de entrar al try');
//     try {
//         const { id } = req.params;
//         console.log('ID:', id);
//         // const producto = await Producto.findById(id).session(session);
//         const producto = await Producto.findById(id);
//         console.log('Producto(BASE): ', producto);
//         console.log('Producto.Materiales usados es: ', producto.materialesUsados);

//         if (!producto) {
//             throw new Error("Producto no encontrado");
//         }

//         // Actualizar el stock de materiales y materiales compuestos utilizados en el producto
//         for (const item of producto.materialesUsados) {

//             console.log('item dentro del for: ', item);
//             const material = await Material.findById(item.materialId).session(session);
//             material.cantidad += item.cantidad;
//             await material.save({ session });
//         }

//         for (const item of producto.materialesCompuestos) {
//             const materialCompuesto = await MaterialCompuesto.findById(item.materialCompuestoId).session(session);
//             materialCompuesto.cantidad += item.cantidad;
//             await materialCompuesto.save({ session });
//         }

//         // Eliminar el producto
//         await Producto.findByIdAndDelete(id).session(session);

//         await session.commitTransaction();
//         session.endSession();
//         logger.info(`Producto eliminado exitosamente: ${producto.nombre}`);
//         res.json({ message: "Producto eliminado correctamente" });
//     } catch (error) {
//         await session.abortTransaction();
//         session.endSession();
//         logger.error(`Error al eliminar producto: ${error.stack}`);
//         res.status(500).json({ error: error.message });
//     }
// };