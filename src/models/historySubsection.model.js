// src/models/historySubsection.model.js
// Definición del modelo para subsecciones de eventos históricos (ej. "Partidos Clave", "Figuras Destacadas" dentro de un evento)

const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const HistorySubsection = sequelize.define('HistorySubsection', {
        // Identificador único de la subsección histórica. Es la clave primaria y se autoincrementa.
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            comment: 'Identificador único de la subsección histórica.',
        },
        // Clave foránea que enlaza esta subsección a un evento histórico principal.
        // NO puede ser nulo, ya que una subsección siempre debe pertenecer a un evento.
        historyEventId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'HistoryEvents', // Nombre de la tabla del modelo HistoryEvent
                key: 'id',
            },
            onDelete: 'CASCADE', // Si se elimina el evento principal, sus subsecciones también se eliminan
            onUpdate: 'CASCADE',
            comment: 'Clave foránea que enlaza esta subsección a un evento histórico principal.',
        },
        // Título de la subsección. No puede ser nulo.
        // Ejemplos: "Partidos Clave", "Anécdotas", "Impacto Social".
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
            comment: 'Título de la subsección histórica.',
        },
        // Contenido principal/texto de la subsección. Permite texto largo. No puede ser nulo.
        content: {
            type: DataTypes.TEXT,
            allowNull: false, // El contenido es fundamental para una subsección
            comment: 'Contenido principal/texto de la subsección histórica.',
        },
        // URL a una imagen específica de esta subsección. Puede ser nula.
        imageUrl: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: 'URL de una imagen específica para esta subsección.',
        },
        // Orden de visualización de esta subsección dentro de su evento principal.
        // Útil para organizar el contenido de un evento.
        displayOrder: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
            comment: 'Orden numérico para mostrar esta subsección dentro de su evento histórico principal.',
        },
        // Indica si la subsección está activa y visible públicamente. Por defecto es true.
        // Permite ocultar subsecciones sin eliminarlas.
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            comment: 'Indica si la subsección está activa y visible públicamente. Usado para borrado suave.',
        },
        // Slug para URLs amigables. Útil para SEO y navegación.
        // Ejemplos: "partidos-clave", "anecdotas".
        slug: {
            type: DataTypes.STRING(255),
            allowNull: true,
            unique: true, // Asegura que el slug sea único
            comment: 'Slug amigable para URL de la subsección histórica. Útil para SEO.',
        },
        // Título meta para SEO para la página de esta subsección. Puede ser nulo.
        metaTitle: {
            type: DataTypes.STRING(160),
            allowNull: true,
            comment: 'Meta título para propósitos de SEO para la página de esta subsección.',
        },
        // Descripción meta para SEO para la página de esta subsección. Puede ser nula.
        metaDescription: {
            type: DataTypes.STRING(300),
            allowNull: true,
            comment: 'Meta descripción para propósitos de SEO para la página de esta subsección.',
        },
    }, {
        // Opciones del modelo de Sequelize
        timestamps: true, // Agrega automáticamente las columnas `createdAt` y `updatedAt`
        tableName: 'HistorySubsections', // Nombre real de la tabla en la base de datos
        comment: 'Tabla para almacenar subsecciones relacionadas con eventos históricos principales.', // Comentario para la tabla
    });

    return HistorySubsection;
};