const express = require("express");
const router = express.Router();
const materialController = require("../controllers/materialController");

router.post("/", materialController.crearMaterial);
router.get("/", materialController.obtenerMateriales);
router.put("/:id", materialController.actualizarMaterial);
router.delete("/:id", materialController.eliminarMaterial);

module.exports = router;
