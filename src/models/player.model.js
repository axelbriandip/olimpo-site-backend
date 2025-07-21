// src/models/player.model.js
// Este archivo define la estructura de la tabla 'Players'
const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Player = sequelize.define('Player', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        position: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        number: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        dateOfBirth: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        nationality: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        photoUrl: { // ¡Este campo es crucial y debe existir en tu DB!
            type: DataTypes.STRING,
            allowNull: true,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    }, {
        timestamps: true,
        tableName: 'Players'
    });

    return Player;
};