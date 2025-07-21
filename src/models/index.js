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
const MonthlyPlayer = require('./monthlyPlayer.model')(sequelize, DataTypes); // Nombre actualizado
const Testimonial = require('./testimonial.model')(sequelize, DataTypes);
const User = require('./user.model')(sequelize, DataTypes);
const Team = require('./team.model')(sequelize, DataTypes);


// --- Definir Asociaciones ---
// Define todas las asociaciones aquí después de que todos los modelos estén cargados
// y disponibles como variables.

// Asociación entre News y Category (Many-to-Many)
News.belongsToMany(Category, {
    through: 'NewsCategories', // Tabla intermedia para la relación N:M
    as: 'categories', // Alias para acceder a las categorías desde una noticia
    foreignKey: 'newsId',
    otherKey: 'categoryId',
    comment: 'Asociación N:M entre Noticias y Categorías.'
});
Category.belongsToMany(News, {
    through: 'NewsCategories',
    as: 'news', // Alias para acceder a las noticias desde una categoría
    foreignKey: 'categoryId',
    otherKey: 'newsId',
    comment: 'Asociación N:M entre Categorías y Noticias.'
});

// Asociación entre HistoryEvent y HistorySubsection (One-to-Many)
// Un evento histórico puede tener muchas subsecciones.
HistoryEvent.hasMany(HistorySubsection, {
    foreignKey: 'historyEventId',
    as: 'subsections', // Alias para acceder a las subsecciones desde un evento
    onDelete: 'CASCADE', // Si se elimina el evento, sus subsecciones también se eliminan
    onUpdate: 'CASCADE',
    comment: 'Un evento histórico tiene muchas subsecciones.'
});
// Una subsección pertenece a un evento histórico.
HistorySubsection.belongsTo(HistoryEvent, {
    foreignKey: 'historyEventId',
    as: 'historyEvent', // Alias para acceder al evento desde una subsección
    comment: 'Una subsección histórica pertenece a un evento histórico.'
});

// Asociación entre MonthlyPlayer y Player (Many-to-One)
// Un MonthlyPlayer pertenece a un Player.
MonthlyPlayer.belongsTo(Player, {
    foreignKey: 'playerId',
    as: 'player', // Este alias 'player' DEBE coincidir con el 'as' en el controlador
    comment: 'Un Jugador Mensual pertenece a un Jugador.'
});
// Un Player puede ser Jugador Mensual varias veces (opcional, para la relación inversa).
Player.hasMany(MonthlyPlayer, {
    foreignKey: 'playerId',
    as: 'monthlyPlayerAwards', // Alias para acceder a los premios desde un jugador
    comment: 'Un Jugador puede tener múltiples premios de Jugador Mensual.'
});

// Asociación entre Match y Team (Many-to-One para homeTeam y awayTeam)
Match.belongsTo(Team, {
    foreignKey: 'homeTeamId',
    as: 'homeTeam', // Alias para acceder al equipo local desde un partido
    comment: 'Un partido tiene un equipo local.',
});
Match.belongsTo(Team, {
    foreignKey: 'awayTeamId',
    as: 'awayTeam', // Alias para acceder al equipo visitante desde un partido
    comment: 'Un partido tiene un equipo visitante.',
});
// Relaciones inversas (opcionales, para acceder a los partidos desde un equipo)
Team.hasMany(Match, {
    foreignKey: 'homeTeamId',
    as: 'homeMatches',
    comment: 'Un equipo puede ser el equipo local en muchos partidos.'
});
Team.hasMany(Match, {
    foreignKey: 'awayTeamId',
    as: 'awayMatches',
    comment: 'Un equipo puede ser el equipo visitante en muchos partidos.'
});

// La asociación Player y Team NO está incluida aquí, como acordamos,
// dado que el campo teamId fue eliminado del modelo Player.


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
    MonthlyPlayer, // Nombre actualizado
    Testimonial,
    User,
    Team,
};