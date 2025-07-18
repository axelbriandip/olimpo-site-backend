// src/models/index.js
const sequelize = require('../config/db');

// Modelos existentes
const News = require('./news.model');
const Category = require('./category.model');
const Match = require('./match.model');
const Player = require('./player.model');
const Identity = require('./identity.model');
const PlayerOfTheMonth = require('./playerOfTheMonth.model');

// NUEVOS MODELOS
const HistoryEvent = require('./historyEvent.model');
const HistorySubsection = require('./historySubsection.model');

// --- Definir Asociaciones Existentes ---
News.belongsToMany(Category, {
    through: 'NewsCategories',
    as: 'categories',
    foreignKey: 'newsId',
    otherKey: 'categoryId'
});

Category.belongsToMany(News, {
    through: 'NewsCategories',
    as: 'news',
    foreignKey: 'categoryId',
    otherKey: 'newsId'
});

// Un HistoryEvent tiene muchas HistorySubsections
HistoryEvent.hasMany(HistorySubsection, {
    foreignKey: 'historyEventId', // La clave foránea en HistorySubsection
    as: 'subsections',             // El alias para usar con `include`
    onDelete: 'CASCADE',           // Si eliminas un evento, sus subsecciones se eliminan
});

// Una HistorySubsection pertenece a un HistoryEvent
HistorySubsection.belongsTo(HistoryEvent, {
    foreignKey: 'historyEventId',
    as: 'historyEvent',            // Alias para la relación inversa si la necesitas
});

// Un PlayerOfTheMonth pertenece a un Player
PlayerOfTheMonth.belongsTo(Player, {
    foreignKey: 'playerId', // La clave foránea en PlayerOfTheMonth
    as: 'player',           // El alias para usar con `include`
});

// Un Player puede ser Jugador del Mes varias veces (opcional, si necesitas la relación inversa)
Player.hasMany(PlayerOfTheMonth, {
    foreignKey: 'playerId',
    as: 'playerOfTheMonthAwards', // Alias para los premios de Jugador del Mes del jugador
});

module.exports = {
    sequelize,
    News,
    Category,
    Match,
    Player,
    HistoryEvent,
    HistorySubsection,
    Identity,
    PlayerOfTheMonth,
};