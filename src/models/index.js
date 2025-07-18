// src/models/index.js
const sequelize = require('../config/db');

// Modelos existentes
const News = require('./news.model');
const Category = require('./category.model');
const Match = require('./match.model');
const Player = require('./player.model');
const Identity = require('./identity.model');

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

// --- NUEVAS ASOCIACIONES ---
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

module.exports = {
    sequelize,
    News,
    Category,
    Match,
    Player,
    HistoryEvent,
    HistorySubsection,
    Identity,
};