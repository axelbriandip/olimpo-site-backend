// src/models/index.js
const sequelize = require('../config/db');
const { DataTypes } = require('sequelize'); // <--- Importa DataTypes aquí

// --- Cargar e Instanciar Modelos ---
// Pasa la instancia de sequelize y DataTypes a cada modelo para que se definan correctamente
const News = require('./news.model')(sequelize, DataTypes);
const Category = require('./category.model')(sequelize, DataTypes);
const Match = require('./match.model')(sequelize, DataTypes);
const Identity = require('./identity.model')(sequelize, DataTypes);
const PlayerOfTheMonth = require('./playerOfTheMonth.model')(sequelize, DataTypes);
const HistoryEvent = require('./historyEvent.model')(sequelize, DataTypes);
const HistorySubsection = require('./historySubsection.model')(sequelize, DataTypes);
const Testimonial = require('./testimonial.model')(sequelize, DataTypes);
const User = require('./user.model')(sequelize, DataTypes);
const Player = require('./player.model')(sequelize, DataTypes); // <--- AQUI ES LA CLAVE


// --- Definir Asociaciones Existentes (ya las tienes, solo asegúrate que los modelos ya estén instanciados arriba) ---

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

HistoryEvent.hasMany(HistorySubsection, {
    foreignKey: 'historyEventId',
    as: 'subsections',
    onDelete: 'CASCADE',
});

HistorySubsection.belongsTo(HistoryEvent, {
    foreignKey: 'historyEventId',
    as: 'historyEvent',
});

// Un PlayerOfTheMonth pertenece a un Player
PlayerOfTheMonth.belongsTo(Player, { // <--- Ahora Player será el modelo de Sequelize
    foreignKey: 'playerId',
    as: 'player',
});

// Un Player puede ser Jugador del Mes varias veces (opcional, si necesitas la relación inversa)
Player.hasMany(PlayerOfTheMonth, { // <--- Ahora Player será el modelo de Sequelize
    foreignKey: 'playerId',
    as: 'playerOfTheMonthAwards',
});

// --- Exportar los Modelos Instanciados ---
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
    Testimonial,
    User,
};