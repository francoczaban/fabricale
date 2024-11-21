const mongoose = require("mongoose");

const proveedorSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    direccion: { type: String, required: true },
    email: { type: String, required: true },
    telefono: { type: String, required: true },

    // materiales: [{
    //   material: { type: mongoose.Schema.Types.ObjectId, ref: 'Material', required: true },
    //   cantidad: { type: Number, required: true },
    //   precio: { type: Number, required: true },  // Asegúrate de que este campo sea requerido
    //   unidadMedida: { type: String, required: true },  // Asegúrate de que este campo sea requerido
    //   nombre: { type: String, required: true }  // Asegúrate de que este campo sea requerido
    // }]
  });
  

module.exports = mongoose.model("Proveedor", proveedorSchema);
