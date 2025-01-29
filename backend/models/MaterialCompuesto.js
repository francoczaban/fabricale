const mongoose = require("mongoose");

const materialCompuestoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    codigo: { type: String, required: true, unique: true },
    cantidad: { type: Number, required: true },
    unidadMedida: { type: String, required: true },
    alertaStock: { type: Number, default: 1 },
    materialesUsados: [{
        material: { type: mongoose.Schema.Types.ObjectId, ref: "Material", required: true },
        cantidad: { type: Number, required: true }
    }]
});

module.exports = mongoose.model("MaterialCompuesto", materialCompuestoSchema);

