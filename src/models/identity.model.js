// src/models/identity.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Asume que db.js está en config/

const Identity = sequelize.define('Identity', {
    // Campos generales de la sección "Nuestra Identidad"
    mainTitle: { // "Nuestra Identidad"
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Solo debería haber un registro de identidad
    },
    mainDescription: { // "Explora nuestra razón de ser..."
        type: DataTypes.TEXT,
        allowNull: false,
    },

    // Campos para la sección "Misión"
    missionIcon: { // Emoji o URL del icono
        type: DataTypes.STRING,
        allowNull: false,
    },
    missionTitle: { // "Misión"
        type: DataTypes.STRING,
        allowNull: false,
    },
    missionText: { // Párrafo de la misión
        type: DataTypes.TEXT,
        allowNull: false,
    },

    // Campos para la sección "Visión"
    visionIcon: { // Emoji o URL del icono
        type: DataTypes.STRING,
        allowNull: false,
    },
    visionTitle: { // "Visión"
        type: DataTypes.STRING,
        allowNull: false,
    },
    visionText: { // Párrafo de la visión
        type: DataTypes.TEXT,
        allowNull: false,
    },

    // Campos para la sección "Valores"
    valuesIcon: { // Emoji o URL del icono
        type: DataTypes.STRING,
        allowNull: false,
    },
    valuesTitle: { // "Valores"
        type: DataTypes.STRING,
        allowNull: false,
    },
    valuesText: { // Párrafo de los valores
        type: DataTypes.TEXT,
        allowNull: false,
    },

    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, {
    timestamps: true, // Para createdAt y updatedAt
    tableName: 'identities', // Nombre de la tabla en la base de datos
});

module.exports = Identity;