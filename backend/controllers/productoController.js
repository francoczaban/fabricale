// controllers/productoController.js
const Material = require("../models/Material");
const MaterialCompuesto = require("../models/MaterialCompuesto");
const Producto = require("../models/Producto");

// Crear un nuevo producto
exports.crearProducto = async (req, res) => {
    const { nombre, codigo, cantidad, unidadMedida, materialesUsados, materialesCompuestosUsados } = req.body;

    try {
        // Verificar stock de cada material básico usado
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

        // Verificar stock de cada material compuesto usado
        for (const item of materialesCompuestosUsados) {
            const materialCompuesto = await MaterialCompuesto.findById(item.materialCompuesto);

            if (!materialCompuesto) {
                return res.status(404).json({ error: `Material compuesto con ID ${item.materialCompuesto} no encontrado` });
            }

            if (materialCompuesto.cantidad < item.cantidad) {
                return res.status(400).json({
                    error: `Stock insuficiente para el material compuesto ${materialCompuesto.nombre}. Disponible: ${materialCompuesto.cantidad}, requerido: ${item.cantidad}`
                });
            }
        }

        // Descontar el stock de cada material básico usado
        for (const item of materialesUsados) {
            await Material.findByIdAndUpdate(item.material, {
                $inc: { cantidad: -item.cantidad }
            });
        }

        // Descontar el stock de cada material compuesto usado
        for (const item of materialesCompuestosUsados) {
            await MaterialCompuesto.findByIdAndUpdate(item.materialCompuesto, {
                $inc: { cantidad: -item.cantidad }
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
        res.status(201).json(producto);
    } catch (error) {
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
