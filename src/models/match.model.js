const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Match = sequelize.define('Match', {
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tournament: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    tournamentDate: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    dateSystem: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    time: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    venue: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    teamA: {
        type: DataTypes.JSON, // o JSONB si usas Postgres
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
});

module.exports = Match;
