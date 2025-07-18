// src/models/player.model.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => { // Exporta una función que recibe sequelize y DataTypes
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
            allowNull: true, // El número de camiseta podría ser opcional
        },
        dateOfBirth: {
            type: DataTypes.DATEONLY, // Formato YYYY-MM-DD
            allowNull: true,
        },
        nationality: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        photoUrl: { // Este es el campo que añadimos para la URL de la imagen del jugador
            type: DataTypes.STRING,
            allowNull: true, // Permitir nulo si la foto no es obligatoria
        },
        // Añade aquí cualquier otro campo que tengas para Player
        // For example:
        // status: {
        //   type: DataTypes.STRING, // e.g., 'active', 'injured', 'retired'
        //   allowNull: true,
        // },
    }, {
        timestamps: true, // Para createdAt y updatedAt
        tableName: 'Players' // Asegúrate de que coincida con el nombre de tu tabla en la DB
    });

    // Si utilizas las asociaciones centralizadas en index.js, no necesitas .associate aquí.
    // Pero si en el futuro decides usarlo, sería así:
    /*
    Player.associate = (models) => {
      Player.hasMany(models.PlayerOfTheMonth, {
        foreignKey: 'playerId',
        as: 'playerOfTheMonthAwards',
      });
      // Si un jugador pertenece a un equipo
      // Player.belongsTo(models.Team, { foreignKey: 'teamId', as: 'team' });
    };
    */

    return Player; // Retorna el modelo definido
};