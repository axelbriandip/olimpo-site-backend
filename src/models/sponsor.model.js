// src/models/sponsor.model.js
// Definición del modelo para los Sponsors del club

const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Sponsor = sequelize.define('Sponsor', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            comment: 'Identificador único del sponsor.',
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            comment: 'Nombre del sponsor.',
        },
        logoUrl: {
            type: DataTypes.STRING(255),
            allowNull: true, // Puede ser nulo si el logo no se carga de inmediato
            comment: 'URL del logo principal del sponsor.',
        },
        logoUrlBlack: { // Nuevo campo para la versión en negro del logo
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: 'URL del logo del sponsor en versión monocromática (negro), útil para fondos claros.',
        },
        logoUrlWhite: { // Nuevo campo para la versión en blanco del logo
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: 'URL del logo del sponsor en versión monocromática (blanco), útil para fondos oscuros.',
        },
        websiteUrl: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: 'URL del sitio web o red social del sponsor.',
        },
        level: {
            type: DataTypes.ENUM('Main', 'Gold', 'Silver', 'Bronze', 'Partner'), // Niveles de patrocinio
            allowNull: true,
            defaultValue: 'Partner',
            comment: 'Nivel de patrocinio (Ej: Principal, Oro, Plata, Bronce, Socio).',
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: 'Fecha de inicio del contrato de patrocinio.',
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: 'Fecha de fin del contrato de patrocinio.',
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            comment: 'Indica si el sponsor está activo y visible.',
        },
        order: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: 'Orden de visualización en el slider o listados.',
        },
    }, {
        timestamps: true, // Agrega createdAt y updatedAt
        tableName: 'Sponsors', // Nombre de la tabla en la base de datos
        comment: 'Tabla para almacenar información de los sponsors del club.',
    });

    return Sponsor;
};
