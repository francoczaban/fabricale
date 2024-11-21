const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    codigo: { type: String, required: true, unique: true },
    cantidad: { type: Number, required: true },
    unidadMedida: { type: String, required: true },
    precio: { type: Number, default: 0 } // Campo no requerido con valor inicial 0
});

module.exports = mongoose.model("Material", materialSchema);
