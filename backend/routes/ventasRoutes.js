const express = require('express');
const router = express.Router();
const ventaController = require('../controllers/ventaController');

// Ruta para registrar una venta
router.post("/", ventaController.registrarVenta);
router.get("/", ventaController.obtenerVentas);

module.exports = router;