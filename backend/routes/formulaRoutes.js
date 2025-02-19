const express = require("express");
const router = express.Router();
const formulaController = require("../controllers/formulaController");

router.post("/", formulaController.crearFormula);
router.get("/", formulaController.obtenerFormulas);
// router.put("/:id", formulaController.editarProducto);
// router.delete("/:id", formulaController.eliminarProducto);

module.exports = router;