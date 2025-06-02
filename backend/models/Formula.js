const mongoose = require("mongoose");

const formulaSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    unidadMedida: { type: String, required: true },
    tipo: { type: String, default: 'Formula' },
    descripcion: { type: String, default: '' },
    categoria: { type: mongoose.Schema.Types.ObjectId, ref: 'Categoria' },  
    categoriaNombre: { type: String, default: ''},
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

module.exports = mongoose.model("Formula", formulaSchema);