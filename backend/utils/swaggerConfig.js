const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Gestión de Stock de Fábrica',
      version: '1.0.0',
      description: 'Documentación de la API para gestionar materiales, materiales compuestos y productos.',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Cambia la URL si usas otro entorno
      },
    ],
  },
  apis: ['./routes/*.js', './controllers/*.js'], // Ubicación de tus rutas y controladores
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
