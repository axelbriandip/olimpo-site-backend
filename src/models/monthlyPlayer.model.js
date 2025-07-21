// src/models/monthlyPlayer.model.js
// Definición del modelo para el Jugador del Mes o reconocimiento mensual a un jugador.

const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const MonthlyPlayer = sequelize.define('MonthlyPlayer', { // Nombre del modelo en Sequelize
        // Identificador único del registro de Jugador del Mes. Clave primaria y autoincrementa.
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            comment: 'Identificador único del registro de Jugador Mensual.',
        },
        // Clave foránea que enlaza este reconocimiento al jugador. No puede ser nulo.
        playerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Players', // Nombre de la tabla del modelo Player
                key: 'id',
            },
            onDelete: 'CASCADE', // Si el jugador se elimina, sus reconocimientos también se eliminan
            onUpdate: 'CASCADE',
            comment: 'Clave foránea que enlaza el reconocimiento al jugador.',
        },
        // Año del reconocimiento. No puede ser nulo.
        year: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: 'Año en que se otorgó el reconocimiento.',
        },
        // Mes del reconocimiento (1-12). No puede ser nulo.
        month: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: 'Mes en que se otorgó el reconocimiento (1-12).',
        },
        // Razón o descripción del reconocimiento. Permite texto largo. No puede ser nulo.
        // Ej: "Por su destacada actuación en el clásico y sus 5 goles en el mes."
        reason: {
            type: DataTypes.TEXT,
            allowNull: false,
            comment: 'Razón o descripción detallada del reconocimiento.',
        },
        // URL de una imagen asociada al reconocimiento (ej. foto del jugador con el premio). Puede ser nulo.
        imageUrl: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: 'URL de una imagen asociada al reconocimiento.',
        },
        // URL de un video de highlights del jugador para ese mes. Puede ser nulo.
        videoUrl: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: 'URL de un video de momentos destacados del jugador para ese mes.',
        },
        // Indica si este reconocimiento está activo y visible. Por defecto es true.
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            comment: 'Indica si el reconocimiento está activo y visible públicamente. Usado para borrado suave.',
        },
        // Campos para SEO si cada reconocimiento tiene una página individual.
        metaTitle: {
            type: DataTypes.STRING(160),
            allowNull: true,
            comment: 'Meta título para propósitos de SEO para la página de este reconocimiento.',
        },
        metaDescription: {
            type: DataTypes.STRING(300),
            allowNull: true,
            comment: 'Meta descripción para propósitos de SEO para la página de este reconocimiento.',
        },
    }, {
        // Opciones del modelo de Sequelize
        timestamps: true, // Agrega automáticamente las columnas `createdAt` y `updatedAt`
        tableName: 'MonthlyPlayers', // Nombre de la tabla en la base de datos (convención plural)
        comment: 'Tabla para almacenar registros de Jugador del Mes.', // Comentario para la tabla
        // Los 'indexes' se han eliminado como solicitaste.
    });

    return MonthlyPlayer;
};