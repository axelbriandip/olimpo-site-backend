// src/models/playerOfTheMonth.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Asume que db.js está en config/

const PlayerOfTheMonth = sequelize.define('PlayerOfTheMonth', {
    month: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 12,
        },
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1900, // Ajusta según el rango de años que necesites
        },
    },
    highlight: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    photo: { // Opcional: una foto específica para el Jugador del Mes
        type: DataTypes.STRING,
        allowNull: true,
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, {
    timestamps: true,
    tableName: 'players_of_the_month', // Nombre de la tabla en la base de datos
    // Añadir una restricción única para que un jugador solo pueda ser Jugador del Mes una vez por mes/año
    indexes: [
        {
            unique: true,
            fields: ['playerId', 'month', 'year']
        }
    ]
});

module.exports = PlayerOfTheMonth;