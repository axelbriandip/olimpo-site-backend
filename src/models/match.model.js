// src/models/match.model.js
// Definición del modelo para partidos o encuentros deportivos

const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Match = sequelize.define('Match', {
        // Identificador único del partido. Clave primaria y autoincrementa.
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            comment: 'Identificador único del partido.',
        },
        // Fecha y hora del partido. No puede ser nulo.
        dateTime: {
            type: DataTypes.DATE,
            allowNull: false,
            comment: 'Fecha y hora del partido.',
        },
        // ID del equipo local (referencia al modelo Team).
        // Este campo es crucial para la normalización.
        homeTeamId: {
            type: DataTypes.INTEGER,
            allowNull: false, // Asume que un partido siempre tiene un equipo local
            references: {
                model: 'Teams', // ¡IMPORTANTE! Asume que tendrás una tabla 'Teams'
                key: 'id',
            },
            onDelete: 'CASCADE', // Si se elimina un equipo, sus partidos asociados se eliminan (o SET NULL)
            onUpdate: 'CASCADE',
            comment: 'ID del equipo local (referencia a la tabla Teams).',
        },
        // Goles o puntos del equipo local. Puede ser nulo si el partido aún no se jugó.
        homeTeamScore: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: 'Puntuación o goles del equipo local.',
        },
        // ID del equipo visitante (referencia al modelo Team).
        // Este campo es crucial para la normalización.
        awayTeamId: {
            type: DataTypes.INTEGER,
            allowNull: false, // Asume que un partido siempre tiene un equipo visitante
            references: {
                model: 'Teams', // ¡IMPORTANTE! Asume que tendrás una tabla 'Teams'
                key: 'id',
            },
            onDelete: 'CASCADE', // Si se elimina un equipo, sus partidos asociados se eliminan (o SET NULL)
            onUpdate: 'CASCADE',
            comment: 'ID del equipo visitante (referencia a la tabla Teams).',
        },
        // Goles o puntos del equipo visitante. Puede ser nulo si el partido aún no se jugó.
        awayTeamScore: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: 'Puntuación o goles del equipo visitante.',
        },
        // Ubicación del partido (ej. "Estadio Monumental", "Cancha Auxiliar").
        location: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: 'Ubicación o nombre del estadio donde se jugó el partido.',
        },
        // Tipo de partido (ej. "Liga", "Copa", "Amistoso", "Torneo").
        matchType: {
            type: DataTypes.STRING(100),
            allowNull: false, // Asume que el tipo de partido es siempre conocido
            comment: 'Tipo de partido (ej. "Liga", "Copa", "Amistoso", "Torneo").',
        },
        // Estado actual del partido (ej. "Programado", "En Curso", "Finalizado", "Postergado", "Cancelado").
        status: {
            type: DataTypes.STRING(50),
            allowNull: false,
            defaultValue: 'Programado', // Estado inicial por defecto
            comment: 'Estado actual del partido (ej. "Programado", "En Curso", "Finalizado").',
        },
        // Opcional: ID de la jornada o fecha del torneo.
        round: {
            type: DataTypes.STRING(50), // Puede ser "Jornada 1", "Cuartos de Final", etc.
            allowNull: true,
            comment: 'Jornada o ronda del torneo.',
        },
        // URL a un resumen o highlights del partido (video). Puede ser nulo.
        highlightsUrl: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: 'URL a un video de resumen o momentos destacados del partido.',
        },
        // URL a la transmisión en vivo del partido (si aplica).
        liveStreamUrl: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: 'URL de la transmisión en vivo del partido (si aplica).',
        },
        // Descripción adicional o comentarios sobre el partido.
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: 'Descripción adicional o comentarios sobre el partido.',
        },
        // Indica si el partido está activo y visible. Por defecto es true.
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            comment: 'Indica si el partido está activo y visible públicamente. Usado para borrado suave.',
        },
        // Campos para SEO específicos del partido (si cada partido tiene una página individual)
        metaTitle: {
            type: DataTypes.STRING(160),
            allowNull: true,
            comment: 'Meta título para propósitos de SEO para la página de este partido.',
        },
        metaDescription: {
            type: DataTypes.STRING(300),
            allowNull: true,
            comment: 'Meta descripción para propósitos de SEO para la página de este partido.',
        },
    }, {
        // Opciones del modelo de Sequelize
        timestamps: true, // Agrega automáticamente las columnas `createdAt` y `updatedAt`
        tableName: 'Matches', // Nombre real de la tabla en la base de datos
        comment: 'Tabla para almacenar información sobre partidos deportivos.', // Comentario para la tabla
        // Los 'indexes' se han eliminado como solicitaste.
    });

    return Match;
};