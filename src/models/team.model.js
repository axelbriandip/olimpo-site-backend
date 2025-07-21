// src/models/team.model.js
// Definición del modelo para equipos deportivos

const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Team = sequelize.define('Team', {
        // Identificador único del equipo. Clave primaria y autoincrementa.
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            comment: 'Identificador único del equipo.',
        },
        // Nombre completo del equipo. No puede ser nulo y debe ser único.
        // Ej: "Club Atlético River Plate", "Club Atlético Boca Juniors".
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true, // Asegura que no haya dos equipos con el mismo nombre
            comment: 'Nombre completo del equipo. Debe ser único.',
        },
        // Nombre corto o abreviatura del equipo. No puede ser nulo.
        // Ej: "River", "Boca".
        shortName: {
            type: DataTypes.STRING(50),
            allowNull: false, // Cambiado a NO NULO
            comment: 'Nombre corto o abreviatura del equipo.',
        },
        // Nombre abreviado del equipo (ej. 3 letras). No puede ser nulo y debe ser único.
        // Ej: "CARP", "CABJ". Útil para marcadores o listados compactos.
        abbreviatedName: {
            type: DataTypes.STRING(3), // Limitado a 3 caracteres
            allowNull: false, // Asume que siempre tendrá un nombre abreviado
            unique: true, // Asegura que el nombre abreviado sea único
            comment: 'Nombre abreviado del equipo (ej. 3 letras, como "RIV").',
        },
        // URL del escudo original del equipo (normal, a todo color).
        originalLogoUrl: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: 'URL del escudo original del equipo (versión a todo color).',
        },
        // URL del escudo del equipo en versión blanca.
        whiteLogoUrl: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: 'URL del escudo del equipo en versión blanca.',
        },
        // URL del escudo del equipo en versión negra.
        blackLogoUrl: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: 'URL del escudo del equipo en versión negra.',
        },
        // Ciudad de origen del equipo. Puede ser nulo.
        city: {
            type: DataTypes.STRING(100),
            allowNull: true,
            comment: 'Ciudad de origen del equipo.',
        },
        // País de origen del equipo. Puede ser nulo.
        country: {
            type: DataTypes.STRING(100),
            allowNull: true,
            comment: 'País de origen del equipo.',
        },
        // Descripción general del equipo. Puede ser nulo.
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: 'Descripción general del equipo.',
        },
        // Primer color principal del equipo (en formato hexadecimal). Puede ser nulo.
        // Ej: "#FFFFFF" (Blanco).
        primaryColor: {
            type: DataTypes.STRING(7), // Para códigos HEX como "#RRGGBB"
            allowNull: true,
            comment: 'Primer color principal del equipo (formato HEX).',
        },
        // Segundo color principal del equipo (en formato hexadecimal). Puede ser nulo.
        // Ej: "#FF0000" (Rojo).
        secondaryColor: {
            type: DataTypes.STRING(7), // Para códigos HEX como "#RRGGBB"
            allowNull: true,
            comment: 'Segundo color principal del equipo (formato HEX).',
        },
        // URL del sitio web oficial del equipo. Puede ser nulo.
        websiteUrl: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: 'URL del sitio web oficial del equipo.',
        },
        // Indica si el equipo está activo y es visible. Por defecto es true.
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            comment: 'Indica si el equipo está activo y visible públicamente. Usado para borrado suave.',
        },
        // Campos para SEO si cada equipo tiene una página individual.
        metaTitle: {
            type: DataTypes.STRING(160),
            allowNull: true,
            comment: 'Meta título para propósitos de SEO para la página de este equipo.',
        },
        metaDescription: {
            type: DataTypes.STRING(300),
            allowNull: true,
            comment: 'Meta descripción para propósitos de SEO para la página de este equipo.',
        },
    }, {
        // Opciones del modelo de Sequelize
        timestamps: true, // Agrega automáticamente las columnas `createdAt` y `updatedAt`
        tableName: 'Teams', // Nombre real de la tabla en la base de datos (convención plural)
        comment: 'Tabla para almacenar información sobre equipos deportivos.', // Comentario para la tabla
        // Los 'indexes' se han eliminado como solicitaste.
    });

    return Team;
};