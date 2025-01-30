const mongoose = require("mongoose");

const productoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    codigo: { type: String, required: true, unique: true },
    cantidad: { type: Number, required: true },
    unidadMedida: { type: String, required: true },
    alertaStock: { type: Number, required: false },
    tipo: { type: String, default: 'Producto' },
    materialesUsados: [{
        material: { type: mongoose.Schema.Types.ObjectId, ref: "Material", required: true },
        cantidad: { type: Number, required: true },
        unidadMedida: { type: String, required: true }
    }],
    materialesCompuestosUsados: [{
        materialCompuesto: { type: mongoose.Schema.Types.ObjectId, ref: "MaterialCompuesto", required: true },
        cantidad: { type: Number, required: true },
        unidadMedida: { type: String, required: true }
    }]
});

module.exports = mongoose.model("Producto", productoSchema);