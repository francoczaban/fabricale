const mongoose = require("mongoose");

const ventaSchema = new mongoose.Schema({
    productosVendidos: [{
        productoId: { type: mongoose.Schema.Types.ObjectId, ref: "Producto", required: true },
        cantidadVendida: { type: Number, required: true },
        precioUnitario: { type: Number, required: true },
    }],
    total: { type: Number, required: true },
    fechaVenta: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Venta", ventaSchema);
