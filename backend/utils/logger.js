// utils/logger.js
const { createLogger, format, transports } = require("winston");

const logger = createLogger({
    level: "info",
    format: format.combine(
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`)
    ),
    transports: [
        new transports.File({ filename: "error.log", level: "error" }), // Guardará los errores en este archivo
        new transports.Console() // También mostrará los logs en la consola
    ]
});

module.exports = logger;
