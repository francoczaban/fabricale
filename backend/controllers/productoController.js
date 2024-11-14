const Material = require("../models/Material");
const MaterialCompuesto = require("../models/MaterialCompuesto");
const Producto = require("../models/Producto");
const { convertirUnidades } = require("../utils/conversorUnidades"); // Importa la función de conversión
const logger = require("../utils/logger");

// Crear un nuevo producto
exports.crearProducto = async (req, res) => {
    const { nombre, codigo, cantidad, unidadMedida, materialesUsados, materialesCompuestosUsados } = req.body;

    try {
        logger.info(`Intentando crear producto: ${nombre}, código: ${codigo}`);
        // Verificar y descontar stock de cada material básico usado
        for (const item of materialesUsados) {
            const material = await Material.findById(item.material);
            if (!material) {
                return res.status(404).json({ error: `Material con ID ${item.material} no encontrado` });
            }

            // Convierte la cantidad necesaria a la unidad del stock actual si es necesario
            const cantidadNecesaria = convertirUnidades(item.cantidad, item.unidadMedida, material.unidadMedida);

            if (material.cantidad < cantidadNecesaria) {
                return res.status(400).json({
                    error: `Stock insuficiente para el material ${material.nombre}. Disponible: ${material.cantidad} ${material.unidadMedida}, requerido: ${cantidadNecesaria} ${material.unidadMedida}`
                });
            }

            // Descontar el stock con la cantidad convertida
            await Material.findByIdAndUpdate(item.material, {
                $inc: { cantidad: -cantidadNecesaria }
            });
        }

        // Verificar y descontar stock de cada material compuesto usado
        for (const item of materialesCompuestosUsados) {
            const materialCompuesto = await MaterialCompuesto.findById(item.materialCompuesto);
            if (!materialCompuesto) {
                return res.status(404).json({ error: `Material compuesto con ID ${item.materialCompuesto} no encontrado` });
            }

            // Convierte la cantidad necesaria a la unidad del stock actual si es necesario
            const cantidadNecesariaCompuesto = convertirUnidades(item.cantidad, item.unidadMedida, materialCompuesto.unidadMedida);

            if (materialCompuesto.cantidad < cantidadNecesariaCompuesto) {
                return res.status(400).json({
                    error: `Stock insuficiente para el material compuesto ${materialCompuesto.nombre}. Disponible: ${materialCompuesto.cantidad} ${materialCompuesto.unidadMedida}, requerido: ${cantidadNecesariaCompuesto} ${materialCompuesto.unidadMedida}`
                });
            }

            // Descontar el stock con la cantidad convertida
            await MaterialCompuesto.findByIdAndUpdate(item.materialCompuesto, {
                $inc: { cantidad: -cantidadNecesariaCompuesto }
            });
        }

        // Crear el nuevo producto
        const producto = new Producto({
            nombre,
            codigo,
            cantidad,
            unidadMedida,
            materialesUsados,
            materialesCompuestosUsados
        });

        await producto.save();
        logger.info(`Producto creado exitosamente: ${nombre}`);
        res.status(201).json(producto);
    } catch (error) {
        logger.error(`Error al crear producto: ${error.stack}`);
        res.status(500).json({ error: error.message });
    }
};

// Obtener productos con los materiales y materiales compuestos poblados
exports.obtenerProductos = async (req, res) => {
    try {
        const productos = await Producto.find()
            .populate("materialesUsados.material", "nombre cantidad unidadMedida") // Poblar detalles de materiales
            .populate("materialesCompuestosUsados.materialCompuesto", "nombre cantidad unidadMedida"); // Poblar detalles de materiales compuestos
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
