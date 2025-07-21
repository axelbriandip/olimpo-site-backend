// src/models/identity.model.js
// Definición del modelo para la identidad institucional del club (Misión, Visión, Valores)

const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Identity = sequelize.define('Identity', {
        // Identificador único del registro de identidad. Clave primaria y autoincrementa.
        // Asume que solo habrá un único registro para la identidad del club.
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            comment: 'Identificador único del registro de identidad institucional.',
        },
        missionText: {
            type: DataTypes.TEXT,
            allowNull: false,
            comment: 'Texto descriptivo de la Misión del club.',
        },
        // URL de la imagen principal para la sección de Misión. (Nuevo campo)
        missionImageUrl: {
            type: DataTypes.STRING(255),
            allowNull: true, // Puede ser nulo si no siempre hay una imagen
            comment: 'URL de la imagen principal para la sección de Misión.',
        },
        // Texto descriptivo de la Visión.
        visionText: {
            type: DataTypes.TEXT,
            allowNull: false,
            comment: 'Texto descriptivo de la Visión del club.',
        },
        // URL de la imagen principal para la sección de Visión. (Nuevo campo)
        visionImageUrl: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: 'URL de la imagen principal para la sección de Visión.',
        },
        // Texto descriptivo de los Valores.
        valuesText: {
            type: DataTypes.TEXT,
            allowNull: false,
            comment: 'Texto descriptivo de los Valores del club.',
        },
        // URL de la imagen principal para la sección de Valores. (Nuevo campo)
        valuesImageUrl: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: 'URL de la imagen principal para la sección de Valores.',
        },
        // Indica si este registro de identidad está activo. Por defecto es true.
        // Útil si se quiere tener una "versión" inactiva o un borrado suave.
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            comment: 'Indica si este registro de identidad está activo. Usado para borrado suave.',
        },
    }, {
        // Opciones del modelo de Sequelize
        timestamps: true, // Agrega automáticamente las columnas `createdAt` y `updatedAt`
        tableName: 'Identities', // Nombre real de la tabla en la base de datos
        comment: 'Tabla para almacenar la información de identidad institucional del club (Misión, Visión, Valores).',
        // No se incluyen 'indexes' ni 'createdBy/updatedBy' según lo solicitado.
    });

    return Identity;
};