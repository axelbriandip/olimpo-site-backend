// src/models/historyEvent.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Asume que db.js está en config/

const HistoryEvent = sequelize.define('HistoryEvent', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Asumimos que los títulos de eventos históricos deben ser únicos
    },
    dateText: { // El texto de la fecha como se muestra en el frontend
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT, // Usamos TEXT para descripciones más largas
        allowNull: false,
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, {
    timestamps: true, // Para createdAt y updatedAt
    tableName: 'history_events', // Nombre de la tabla en la base de datos (opcional, buena práctica)
});

module.exports = HistoryEvent;