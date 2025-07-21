// src/models/player.model.js
// Definición del modelo para jugadores

const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Player = sequelize.define('Player', {
        // Identificador único del jugador. Clave primaria y autoincrementa.
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            comment: 'Identificador único del jugador.',
        },
        // Primer nombre del jugador. No puede ser nulo.
        firstName: {
            type: DataTypes.STRING(100),
            allowNull: false,
            comment: 'Primer nombre del jugador.',
        },
        // Apellido del jugador. No puede ser nulo.
        lastName: {
            type: DataTypes.STRING(100),
            allowNull: false,
            comment: 'Apellido del jugador.',
        },
        // Posición principal del jugador (ej. "Delantero", "Defensa", "Mediocampista", "Arquero").
        position: {
            type: DataTypes.STRING(100),
            allowNull: false,
            comment: 'Posición principal del jugador en el campo.',
        },
        // Número de camiseta del jugador. Puede ser nulo.
        number: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: 'Número de camiseta del jugador.',
        },
        // Fecha de nacimiento del jugador. Puede ser nula.
        dateOfBirth: {
            type: DataTypes.DATEONLY, // Solo fecha, sin hora (YYYY-MM-DD)
            allowNull: true,
            comment: 'Fecha de nacimiento del jugador.',
        },
        // Ciudad de nacimiento del jugador. (Nuevo campo)
        cityOfBirth: {
            type: DataTypes.STRING(100),
            allowNull: true,
            comment: 'Ciudad de nacimiento del jugador.',
        },
        // Provincia/Estado de nacimiento del jugador. (Nuevo campo)
        stateOfBirth: {
            type: DataTypes.STRING(100),
            allowNull: true,
            comment: 'Provincia/Estado de nacimiento del jugador.',
        },
        // Nacionalidad del jugador. Puede ser nulo.
        nationality: {
            type: DataTypes.STRING(100),
            allowNull: true,
            comment: 'Nacionalidad del jugador.',
        },
        // Pie hábil del jugador (ej. "Derecho", "Izquierdo", "Ambos").
        preferredFoot: {
            type: DataTypes.STRING(20),
            allowNull: true,
            comment: 'Pie hábil del jugador (ej. "Derecho", "Izquierdo", "Ambos").',
        },
        // URL a la foto de perfil del jugador. Puede ser nulo.
        photoUrl: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: 'URL a la foto de perfil del jugador.',
        },
        // Descripción o biografía corta del jugador. Puede ser nulo.
        biography: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: 'Breve biografía o descripción del jugador.',
        },
        // URL del perfil de Instagram del jugador.
        instagramUrl: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: 'URL del perfil de Instagram del jugador.',
        },
        // Estado actual del jugador (ej. "Activo", "Lesionado", "Suspendido", "Cedido", "Retirado").
        status: {
            type: DataTypes.STRING(50),
            allowNull: true,
            defaultValue: 'Activo',
            comment: 'Estado actual del jugador (ej. "Activo", "Lesionado", "Suspendido").',
        },
        // Indica si el jugador está activo en el equipo o visible públicamente. Por defecto es true.
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            comment: 'Indica si el jugador está activo y visible públicamente. Usado para borrado suave.',
        },
        // Campos para SEO si cada jugador tiene una página individual.
        metaTitle: {
            type: DataTypes.STRING(160),
            allowNull: true,
            comment: 'Meta título para propósitos de SEO para la página de este jugador.',
        },
        metaDescription: {
            type: DataTypes.STRING(300),
            allowNull: true,
            comment: 'Meta descripción para propósitos de SEO para la página de este jugador.',
        },
    }, {
        // Opciones del modelo de Sequelize
        timestamps: true, // Agrega automáticamente las columnas `createdAt` y `updatedAt`
        tableName: 'Players', // Nombre real de la tabla en la base de datos (convención plural)
        comment: 'Tabla para almacenar información sobre jugadores.', // Comentario para la tabla
        // Los 'indexes' se han eliminado como solicitaste.
    });

    return Player;
};