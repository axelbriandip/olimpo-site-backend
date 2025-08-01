// src/config/db.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

// Se usa directamente la DATABASE_URL para la conexión
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false, // Desactiva el log de SQL para producción

    dialectOptions: {
        ssl: {
            require: true, // Forzar conexión SSL
            rejectUnauthorized: false // ¡Crucial para Render! Permite certificados autofirmados
        }
    },
    // Opcional: Pool de conexiones para mejor rendimiento en producción
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

module.exports = sequelize;
