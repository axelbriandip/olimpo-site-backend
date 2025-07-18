// src/models/historySubsection.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Asume que db.js está en config/
const HistoryEvent = require('./historyEvent.model'); // Importamos el modelo padre

const HistorySubsection = sequelize.define('HistorySubsection', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    img: { // URL o ruta de la imagen
        type: DataTypes.STRING,
        allowNull: true, // Puede que no todas las subsecciones tengan imagen
    },
    // No necesitamos historyEventId aquí, Sequelize lo gestionará con la asociación
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, {
    timestamps: true,
    tableName: 'history_subsections', // Nombre de la tabla
});

module.exports = HistorySubsection;