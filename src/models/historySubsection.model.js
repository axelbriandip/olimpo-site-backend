// src/models/historySubsection.model.js
const { DataTypes } = require('sequelize');
// NO necesitas importar 'sequelize' aquí.
// NO necesitas importar HistoryEvent aquí si las asociaciones se manejan en index.js.
// const sequelize = require('../config/db'); // <-- ELIMINAR ESTA LÍNEA
// const HistoryEvent = require('./historyEvent.model'); // <-- ELIMINAR ESTA LÍNEA si la asociación se define en index.js

module.exports = (sequelize, DataTypes) => { // <-- Exporta una FUNCIÓN
    const HistorySubsection = sequelize.define('HistorySubsection', {
        id: { // Añadir un ID explícito si no lo tenías
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
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
        // La clave foránea historyEventId se gestionará mediante la asociación en index.js,
        // pero DEBE estar definida como un atributo del modelo si existe en tu tabla de DB.
        // Si HistorySubsection.belongsTo(HistoryEvent) en index.js, Sequelize añadirá por defecto `historyEventId`.
        // Es buena práctica definirla aquí si la vas a usar directamente en consultas, etc.
        historyEventId: {
            type: DataTypes.INTEGER,
            allowNull: false, // O true si una subsección puede existir sin un evento principal
            // references: { // Esto es opcional, Sequelize puede inferirlo si defines la FK en index.js
            //   model: 'history_events', // Nombre de la tabla referenciada
            //   key: 'id',
            // },
            // onDelete: 'CASCADE', // Si eliminas el evento, se elimina la subsección. Define en la asociación.
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    }, {
        timestamps: true,
        tableName: 'history_subsections', // Nombre de la tabla
    });

    // Si utilizas las asociaciones centralizadas en index.js, no necesitas .associate aquí.
    // Pero si en el futuro decides usarlo, sería así:
    /*
    HistorySubsection.associate = (models) => {
      HistorySubsection.belongsTo(models.HistoryEvent, {
        foreignKey: 'historyEventId',
        as: 'historyEvent',
      });
    };
    */

    return HistorySubsection; // <-- La función DEBE DEVOLVER el modelo definido
};