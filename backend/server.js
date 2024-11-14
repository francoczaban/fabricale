const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const materialRoutes = require("./routes/materialRoutes");
const materialCompuestoRoutes = require("./routes/materialCompuestoRoutes");
const productoRoutes = require("./routes/productoRoutes");
const logger = require("./utils/logger"); 

const app = express();
app.use(express.json());
const PORT = 3000;
app.use(cors());
app.use((req, res, next) => {
  logger.info(`Request: ${req.method} ${req.url}`);
  next();
});
app.use((err, req, res, next) => {
  logger.error(`Error 500: ${err.message}`);
  res.status(500).json({ error: "Ha ocurrido un error en el servidor" });
});

app.use("/api/materiales-compuestos", materialCompuestoRoutes);
app.use("/api/productos", productoRoutes);
app.use("/api/materiales", materialRoutes);
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/fabrica', {
})
  .then(() => console.log('Conectado a MongoDB!!!'))
  .catch(err => console.error('Error de conexión:', err));

// Rutas
app.get("/", (req, res) => {
    res.send("API de Gestión de Stock de Fábrica");
});

// Escuchar en el puerto especificado
app.listen(PORT, () => {
  logger.info(`Servidor escuchando en http://localhost:${PORT}`);
});










