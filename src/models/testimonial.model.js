// src/models/testimonial.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Asume que db.js está en config/

const Testimonial = sequelize.define('Testimonial', {
    authorName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    authorRole: { // Ej: "Ex-jugador", "Padre de socio", "Hincha"
        type: DataTypes.STRING,
        allowNull: true, // Puede ser opcional
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    photo: { // URL o ruta a la foto del autor
        type: DataTypes.STRING,
        allowNull: true, // Puede ser opcional
    },
    rating: { // Calificación, ej: 1 a 5 estrellas
        type: DataTypes.INTEGER,
        allowNull: true, // Puede ser opcional
        validate: {
            min: 1,
            max: 5,
        },
    },
    date: { // Fecha del testimonio
        type: DataTypes.DATEONLY, // Solo fecha, sin hora
        allowNull: true, // Puede ser opcional
        defaultValue: DataTypes.NOW, // Por defecto la fecha actual si no se especifica
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, {
    timestamps: true, // Para createdAt y updatedAt
    tableName: 'testimonials', // Nombre de la tabla en la base de datos
});

module.exports = Testimonial;