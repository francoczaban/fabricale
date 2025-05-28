const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const materialRoutes = require("./routes/materialRoutes");
const formulaRoutes = require("./routes/formulaRoutes");
const materialCompuestoRoutes = require("./routes/materialCompuestoRoutes");
const productoRoutes = require("./routes/productoRoutes");
const proveedorRoutes = require("./routes/proveedorRoutes");
const ventasRoutes = require("./routes/ventasRoutes");
const categoriaRoutes = require("./routes/categoriaRoutes");
const logger = require("./utils/logger");
const auth = require('./routes/auth');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require("./utils/swaggerConfig");


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
app.use('/api/register', auth);
app.use('/api/proveedores', proveedorRoutes);
app.use('/api/formula', formulaRoutes);
app.use('/api/ventas', ventasRoutes);
app.use('/api/categoria', categoriaRoutes);
app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

mongoose.connect('mongodb://localhost:27017/fabrica', {})
    .then(() => console.log('Conectado a MongoDB!!!'))
    .catch(err => console.error('Error de conexión:', err));

app.get("/", (req, res) => {
    res.send("API de Gestión de Stock de Fábrica");
});

app.listen(PORT, () => {
    logger.info(`Servidor escuchando en http://localhost:${PORT}`);
});