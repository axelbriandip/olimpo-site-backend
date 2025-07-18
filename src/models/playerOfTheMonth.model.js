// src/models/playerOfTheMonth.model.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => { // Exporta una función que recibe sequelize y DataTypes
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
        playerId: { // Clave foránea que referencia al jugador
            type: DataTypes.INTEGER,
            allowNull: false, // Asumo que un Jugador del Mes siempre debe estar asociado a un Player
            references: { // Esto es opcional, Sequelize puede inferirlo, pero es buena práctica
                model: 'Players', // Nombre de la tabla a la que hace referencia (por defecto el plural del modelo)
                key: 'id',
            },
            onDelete: 'CASCADE', // Si se elimina el jugador, se elimina el registro de POTM
            onUpdate: 'CASCADE', // Si cambia el ID del jugador (raro), se actualiza aquí
        },
        reason: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {
        timestamps: true, // Para createdAt y updatedAt
        tableName: 'PlayerOfTheMonths', // Asegúrate de que coincida con el nombre de tu tabla en la DB
        uniqueKeys: {
            unique_player_month_year: { // Impide que haya dos Jugadores del Mes para el mismo mes y año
                fields: ['month', 'year']
            }
        }
    });

    // Si utilizas las asociaciones centralizadas en index.js, no necesitas .associate aquí.
    // Pero si en el futuro decides usarlo, sería así:
    /*
    PlayerOfTheMonth.associate = (models) => {
      PlayerOfTheMonth.belongsTo(models.Player, {
        foreignKey: 'playerId',
        as: 'player',
      });
    };
    */

    return PlayerOfTheMonth; // Retorna el modelo definido
};