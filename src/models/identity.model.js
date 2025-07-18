// src/models/identity.model.js

// SOLO necesitas DataTypes aquí.
// NO importes 'sequelize' aquí, ya que se te pasará como argumento.
const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => { // <-- **ESTA ES LA CLAVE: Exporta una FUNCIÓN**
    const Identity = sequelize.define('Identity', {
        id: { // Un ID es crucial, aunque no lo tuvieras antes. Sequelize lo añade por defecto, pero es buena práctica.
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        mainTitle: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        mainDescription: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        missionIcon: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        missionTitle: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        missionText: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        visionIcon: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        visionTitle: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        visionText: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        valuesIcon: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        valuesTitle: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        valuesText: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        // Añade cualquier otro campo que tengas en tu modelo Identity
    }, {
        timestamps: true, // Para createdAt y updatedAt
        tableName: 'Identities' // Asegúrate de que el nombre de la tabla sea 'Identities' o el que uses en tu DB
    });

    // Si tienes asociaciones relacionadas con Identity, pero las defines en index.js,
    // no necesitas el método .associate aquí.

    return Identity; // <-- La función DEBE DEVOLVER el modelo definido
};