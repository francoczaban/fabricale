const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    codigo: { type: String, required: true, unique: true },
    cantidad: { type: Number, required: true },
    unidadMedida: { type: String, required: true }
});

module.exports = mongoose.model("Material", materialSchema);
