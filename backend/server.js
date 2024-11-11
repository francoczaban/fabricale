const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const materialRoutes = require("./routes/materialRoutes");
const materialCompuestoRoutes = require("./routes/materialCompuestoRoutes");
const productoRoutes = require("./routes/productoRoutes");
const auth = require('./routes/auth');

const app = express();
app.use(express.json());
const PORT = 3000;
app.use(cors());

app.use("/api/materiales-compuestos", materialCompuestoRoutes);
app.use("/api/productos", productoRoutes);
app.use("/api/materiales", materialRoutes);
app.use('/api/register', auth);
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/fabrica', {
})
  .then(() => console.log('Conectado a MongoDB!!!'))
  .catch(err => console.error('Error de conexión:', err));

// Rutas
app.get("/", (req, res) => {
    res.send("API de Gestión de Stock de Fábrica");
});

app.get('/api/:type', (req, res) => {
  const { type } = req.params;
  const { q } = req.query;

  if (type === 'materiales') {
    // Filtra los materiales según el parámetro q
    const resultados = materiales.filter(item => item.nombre.includes(q) || item.codigo.includes(q));
    return res.json(resultados);
  }
  if (type === 'materiales-compuestos') {
    // Filtra los materiales compuestos
    const resultados = materialesCompuestos.filter(item => item.nombre.includes(q) || item.codigo.includes(q));
    return res.json(resultados);
  }
  if (type === 'productos') {
    // Filtra los productos
    const resultados = productos.filter(item => item.nombre.includes(q) || item.codigo.includes(q));
    return res.json(resultados);
  }

  res.status(404).send('Tipo no encontrado');
});


// Escuchar en el puerto especificado
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});










