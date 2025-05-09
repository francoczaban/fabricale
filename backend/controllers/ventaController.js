const Venta = require("../models/Venta");
const Producto = require("../models/Producto");
const logger = require("../utils/logger");

exports.registrarVenta = async (req, res) => {
    try {
        const { productoId, cantidadVendida, precioUnitario } = req.body;

        // Buscar el producto a vender
        const producto = await Producto.findById(productoId);
        if (!producto) {
            throw new Error("Producto no encontrado");
        }

        // Verificar que haya suficiente stock
        if (producto.cantidad < cantidadVendida) {
            throw new Error(`Stock insuficiente para el producto ${producto.nombre}. Disponible: ${producto.cantidad}, requerido: ${cantidadVendida}`);
        }

        // Calcular el total de la venta
        const totalVenta = cantidadVendida * precioUnitario;

        // Crear la venta
        const nuevaVenta = new Venta({
            productoId,
            cantidadVendida,
            precioUnitario,
            total: totalVenta,
        });

        // Guardar la venta
        await nuevaVenta.save();

        // Descontar el stock del producto
        producto.cantidad -= cantidadVendida;
        await producto.save();

        logger.info(`Venta registrada exitosamente para el producto: ${producto.nombre}`);
        res.status(201).json(nuevaVenta);
    } catch (error) {
        logger.error(`Error al registrar venta: ${error.stack}`);
        res.status(500).json({ error: error.message });
    }
};

// exports.obtenerVentas = async (req, res) => {
//     try {
//         // Obtener todas las ventas
//         const ventas = await Venta.find()
//             .populate("productoId", "nombre codigo cantidad unidadMedida")  // Rellenar la información del producto
//             .exec();

//         res.status(200).json(ventas);
//     } catch (error) {
//         logger.error(`Error al obtener ventas: ${error.stack}`);
//         res.status(500).json({ error: error.message });
//     }
// };


exports.obtenerVentas = async (req, res) => {
    try {
        const ventas = await Venta.find();
        res.json(ventas);
    } catch (error) {
        logger.error(`Error al obtener ventas: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};