// src/models/match.model.js

// SOLO necesitas DataTypes aquí.
// NO importes 'sequelize' aquí, ya que se te pasará como argumento.
const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => { // <-- **ESTA ES LA CLAVE: Exporta una FUNCIÓN**
    const Match = sequelize.define('Match', {
        id: { // Siempre es buena práctica tener un ID explícito
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tournament: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        tournamentDate: {
            type: DataTypes.STRING, // Considera usar DataTypes.DATE o DataTypes.DATEONLY para fechas
            allowNull: true,
        },
        dateSystem: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        time: {
            type: DataTypes.STRING, // Considera usar DataTypes.TIME o DataTypes.DATE para horas
            allowNull: true,
        },
        venue: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        teamA: {
            type: DataTypes.JSON, // o DataTypes.JSONB si usas PostgreSQL para mejor rendimiento con JSON
            allowNull: false,
        },
        teamB: {
            type: DataTypes.JSON,
            allowNull: false,
        },
        result: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        }
    }, {
        timestamps: true,
        tableName: 'Matches' // Importante: Asegura que el nombre de la tabla sea 'Matches' o el que uses en tu DB
    });

    // Si tienes asociaciones relacionadas con Match, pero las defines en index.js,
    // no necesitas el método .associate aquí.

    return Match; // <-- La función DEBE DEVOLVER el modelo definido
};