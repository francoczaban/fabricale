const express = require('express');
const router = express.Router();
const proveedorController = require('../controllers/proveedorController');
const PurchaseController = require('../controllers/purchaseController');

// Rutas para proveedores
router.post('/', proveedorController.createProveedor); // No es necesario agregar "/proveedores"
router.get('/', proveedorController.getProveedores); // No es necesario agregar "/proveedores"

// Rutas para compras
router.get('/compras', PurchaseController.getPurchases);

module.exports = router;
