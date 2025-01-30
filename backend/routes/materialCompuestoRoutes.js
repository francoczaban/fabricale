// routes/materialCompuestoRoutes.js
const express = require("express");
const router = express.Router();
const materialCompuestoController = require("../controllers/materialCompuestoController");

router.get("/", materialCompuestoController.obtenerMaterialesCompuestos);
router.post("/", materialCompuestoController.crearMaterialCompuesto);
router.put("/:id", materialCompuestoController.editarMaterialCompuesto);
router.delete("/:id", materialCompuestoController.eliminarMaterialCompuesto);

module.exports = router;