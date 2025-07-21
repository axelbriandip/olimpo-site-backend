// src/models/playerOfTheMonth.model.js
// Este archivo define la estructura de la tabla 'PlayerOfTheMonths'
const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const PlayerOfTheMonth = sequelize.define('PlayerOfTheMonth', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        month: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        playerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Players', // ¡Asegúrate de que 'Players' es el nombre de la tabla!
                key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        reason: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        is_active: { // Este campo también es crucial y debe existir en tu DB
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    }, {
        timestamps: true,
        tableName: 'PlayerOfTheMonths',
        uniqueKeys: {
            unique_player_month_year: {
                fields: ['month', 'year']
            }
        }
    });

    return PlayerOfTheMonth;
};