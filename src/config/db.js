// src/config/db.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

// Intenta usar DATABASE_URL si está disponible (común en entornos de producción como Render)
// De lo contrario, usa las variables individuales para el desarrollo local
const connectionString = process.env.DATABASE_URL;

const sequelize = new Sequelize(
    // Si hay connectionString, Sequelize la parseará automáticamente.
    // Si no, usa los parámetros individuales.
    connectionString || process.env.DB_NAME, // DATABASE_URL ya incluye el nombre de la DB
    connectionString ? null : process.env.DB_USER,
    connectionString ? null : process.env.DB_PASSWORD,
    {
        host: connectionString ? null : process.env.DB_HOST,
        dialect: 'postgres',
        port: connectionString ? null : process.env.DB_PORT,
        logging: false, // Puedes cambiar a console.log en desarrollo si quieres ver las queries SQL

        // Configuración SSL para producción (requerida por Render y otros proveedores de DB en la nube)
        dialectOptions: connectionString ? { // Solo aplica si estamos usando DATABASE_URL
            ssl: {
                require: true, // Forzar conexión SSL
                rejectUnauthorized: false // Importante para Render, ya que usa certificados autofirmados
            }
        } : {}, // Objeto vacío si no hay connectionString (para desarrollo local sin SSL)
    }
);

module.exports = sequelize;
