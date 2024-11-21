const Proveedor = require('../models/Proveedor');
const Material = require('../models/Material');
const Purchase = require('../models/purchase');
const logger = require("../utils/logger");

exports.createProveedor = async (req, res) => {  
    try {
        // Extraer los campos del cuerpo de la solicitud
        const { nombre, direccion, email, telefono } = req.body;

        // Crear un nuevo proveedor con los datos recibidos
        const proveedor = new Proveedor({ nombre, direccion, email, telefono });

        // Guardar el proveedor en la base de datos
        await proveedor.save();
        logger.info(`Proveedor creado exitosamente: ${nombre}`);

        // Responder con el proveedor creado
        res.status(201).json(proveedor);
    } catch (error) {
        console.error("Error al crear proveedor:", error.message);
        res.status(500).json({ error: error.message });
    }
};  


exports.getProveedores = async (req, res) => {
  try {
    const proveedores = await Proveedor.find();
    res.status(200).json(proveedores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los proveedores' });
  }
};