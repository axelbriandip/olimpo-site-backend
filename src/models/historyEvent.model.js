// src/models/historyEvent.model.js
const { DataTypes } = require('sequelize');
// NO necesitas importar 'sequelize' aquí.
// const sequelize = require('../config/db'); // <-- ELIMINAR ESTA LÍNEA

module.exports = (sequelize, DataTypes) => { // <-- Exporta una FUNCIÓN
    const HistoryEvent = sequelize.define('HistoryEvent', {
        id: { // Añadir un ID explícito si no lo tenías
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
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

    // Si utilizas las asociaciones centralizadas en index.js, no necesitas .associate aquí.
    // Pero si en el futuro decides usarlo, sería así:
    /*
    HistoryEvent.associate = (models) => {
      HistoryEvent.hasMany(models.HistorySubsection, {
        foreignKey: 'historyEventId',
        as: 'subsections',
        onDelete: 'CASCADE',
      });
    };
    */

    return HistoryEvent; // <-- La función DEBE DEVOLVER el modelo definido
};