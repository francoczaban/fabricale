const express = require('express');
const router = express.Router();
const proveedorController = require('../controllers/proveedorController');

// Rutas para proveedores
router.post('/', proveedorController.createProveedor); // No es necesario agregar "/proveedores"
router.get('/', proveedorController.getProveedores); // No es necesario agregar "/proveedores"

module.exports = router;
