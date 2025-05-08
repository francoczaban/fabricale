// material model
const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    codigo: { type: String, required: true, unique: true },
    cantidad: { type: Number, required: true },
    unidadMedida: { type: String, required: true },
    precio: { type: Number, default: 0 },
    alertaStock: { type: Number, default: 1 },
    tipo: { type: String, default: 'Material' },
    proveedor: { type: mongoose.Schema.Types.ObjectId, ref: 'Proveedor' },  // Relación con el proveedor
    proveedorName: { type: String, default: ''}
});

module.exports = mongoose.model("Material", materialSchema);
