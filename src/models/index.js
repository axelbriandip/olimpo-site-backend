// src/models/index.js
// Archivo central para cargar todos los modelos de Sequelize y definir sus asociaciones.

const sequelize = require('../config/db'); // Asume que esto exporta la instancia configurada de sequelize
const { DataTypes } = require('sequelize'); // Importa DataTypes directamente de Sequelize

// --- Cargar e Instanciar Modelos ---
// Pasa la instancia de sequelize y DataTypes a cada modelo para que se definan correctamente.
// El orden de importación puede importar si hay dependencias circulares, pero para asociaciones simples no suele ser un problema.
const Category = require('./category.model')(sequelize, DataTypes);
const HistoryEvent = require('./historyEvent.model')(sequelize, DataTypes);
const HistorySubsection = require('./historySubsection.model')(sequelize, DataTypes);
const Identity = require('./identity.model')(sequelize, DataTypes);
const Match = require('./match.model')(sequelize, DataTypes);
const News = require('./news.model')(sequelize, DataTypes);
const Player = require('./player.model')(sequelize, DataTypes);
const PlayerOfTheMonth = require('./playerOfTheMonth.model')(sequelize, DataTypes);
const Testimonial = require('./testimonial.model')(sequelize, DataTypes);
const User = require('./user.model')(sequelize, DataTypes);
const Team = require('./team.model')(sequelize, DataTypes);


// --- Definir Asociaciones ---
// Define todas las asociaciones aquí después de que todos los modelos estén cargados
// y disponibles como variables.

// News and Category (Many-to-Many)
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

// HistoryEvent and HistorySubsection (One-to-Many)
HistoryEvent.hasMany(HistorySubsection, {
    foreignKey: 'historyEventId',
    as: 'subsections',
    onDelete: 'CASCADE',
});
HistorySubsection.belongsTo(HistoryEvent, {
    foreignKey: 'historyEventId',
    as: 'historyEvent',
});

// PlayerOfTheMonth and Player (Many-to-One)
// Un PlayerOfTheMonth pertenece a un Player
PlayerOfTheMonth.belongsTo(Player, {
    foreignKey: 'playerId',
    as: 'player', // Este alias 'player' DEBE coincidir con el 'as' en el controlador
});
// Un Player puede ser Jugador del Mes varias veces (opcional, para la relación inversa)
Player.hasMany(PlayerOfTheMonth, {
    foreignKey: 'playerId',
    as: 'playerOfTheMonthAwards',
});

// Match and Team (Many-to-One para homeTeam y awayTeam)
// Estas asociaciones requieren que el modelo 'Team' esté definido y exportado.
// Las dejo aquí comentadas hasta que hayamos finalizado el modelo Team.
if (Team) { // Solo define si el modelo Team ya está cargado
    Match.belongsTo(Team, {
        foreignKey: 'homeTeamId',
        as: 'homeTeam',
    });
    Match.belongsTo(Team, {
        foreignKey: 'awayTeamId',
        as: 'awayTeam',
    });
    // Relaciones inversas (opcionales, para acceder a los partidos desde un equipo)
    Team.hasMany(Match, {
        foreignKey: 'homeTeamId',
        as: 'homeMatches',
    });
    Team.hasMany(Match, {
        foreignKey: 'awayTeamId',
        as: 'awayMatches',
    });
}

// --- Exportar los Modelos Instanciados ---
// Exporta todos los modelos y la instancia de Sequelize.
module.exports = {
    sequelize,
    Category,
    HistoryEvent,
    HistorySubsection,
    Identity,
    Match,
    News,
    Player,
    PlayerOfTheMonth,
    Testimonial,
    User,
    Team,
};