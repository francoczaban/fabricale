const Venta = require("../models/Venta");
const Producto = require("../models/Producto");
const logger = require("../utils/logger");

exports.registrarVenta = async (req, res) => {
    try {
        const { productosVendidos } = req.body;

        if (!productosVendidos || !Array.isArray(productosVendidos) || productosVendidos.length === 0) {
            throw new Error("Se requiere al menos un producto para registrar la venta.");
        }

        let totalVenta = 0;

        // Validar productos y descontar stock
        for (const item of productosVendidos) {
            const { productoId, cantidadVendida, precioUnitario } = item;

            const producto = await Producto.findById(productoId);
            if (!producto) {
                throw new Error(`Producto no encontrado con ID: ${productoId}`);
            }

            if (producto.cantidad < cantidadVendida) {
                throw new Error(`Stock insuficiente para ${producto.nombre}. Disponible: ${producto.cantidad}, requerido: ${cantidadVendida}`);
            }

            // Descontar stock
            producto.cantidad -= cantidadVendida;
            await producto.save();

            // Calcular total
            totalVenta += cantidadVendida * precioUnitario;
        }

        // Crear y guardar la venta
        const nuevaVenta = new Venta({
            productosVendidos,
            total: totalVenta
        });

        await nuevaVenta.save();
        res.status(201).json(nuevaVenta);
    } catch (error) {
        logger.error(`Error al registrar venta: ${error.stack}`);
        res.status(500).json({ error: error.message });
    }
};


exports.obtenerVentas = async (req, res) => {
    try {
        const ventas = await Venta.find().populate('productosVendidos.productoId');
        res.json(ventas);
    } catch (error) {
        logger.error(`Error al obtener ventas: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};