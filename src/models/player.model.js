const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Player = sequelize.define('Player', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    birthDate: {
        type: DataTypes.DATEONLY,
    },
    position: {
        type: DataTypes.STRING,
    },
    preferredFoot: {
        type: DataTypes.STRING,
    },
    photo: {
        type: DataTypes.STRING,
    },
    category: {
        type: DataTypes.STRING,
    },
    dni: {
        type: DataTypes.STRING,
        unique: true,
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, {
    timestamps: true,
});

module.exports = Player;
