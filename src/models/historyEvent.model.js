// src/models/historyEvent.model.js
// Definición del modelo para eventos históricos principales (ej. "Fundación del Club", "Campeonato de 1980")

const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const HistoryEvent = sequelize.define('HistoryEvent', {
        // Identificador único del evento histórico. Clave primaria y autoincrementa.
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            comment: 'Unique identifier for the historical event.',
        },
        // Título del evento. Debe ser único y no puede ser nulo.
        // Ejemplos: "Fundación del Club", "Campeonato de Primera División 1980".
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true, // Cada evento debería tener un título único
            comment: 'Title of the historical event. Must be unique.',
        },
        // Año en que ocurrió el evento. No puede ser nulo.
        // Es un número entero.
        year: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: 'Year when the historical event occurred.',
        },
        // Mes en que ocurrió el evento (1-12). Puede ser nulo si solo se conoce el año.
        month: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: 'Month when the historical event occurred (1-12). Optional.',
        },
        // Día en que ocurrió el evento (1-31). Puede ser nulo si solo se conoce el año/mes.
        day: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: 'Day when the historical event occurred (1-31). Optional.',
        },
        // Descripción principal del evento. Permite texto largo. No puede ser nulo.
        description: {
            type: DataTypes.TEXT,
            allowNull: false, // La descripción es fundamental para un evento
            comment: 'Main description of the historical event.',
        },
        // URL de una imagen principal o destacada del evento. Puede ser nula.
        // Ej: foto del equipo campeón, documento de fundación.
        imageUrl: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: 'URL to the main image or featured photo of the event.',
        },
        // Un slug para URLs amigables. Útil para SEO y navegación.
        // Ej: "fundacion-del-club", "campeonato-1980".
        slug: {
            type: DataTypes.STRING(255),
            allowNull: true,
            unique: true,
            comment: 'URL-friendly slug for the historical event. Useful for SEO.',
        },
        // Indica si el evento está activo y visible. Por defecto es true.
        // Permite ocultar eventos sin eliminarlos.
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            comment: 'Indicates if the historical event is active and publicly visible. Used for soft deletion.',
        },
        // Orden de visualización en una lista de eventos históricos.
        // Útil para ordenar cronológicamente o por importancia.
        displayOrder: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
            comment: 'Numerical order for displaying historical events in a list.',
        },
        // Campos para SEO específicos del evento
        metaTitle: {
            type: DataTypes.STRING(160),
            allowNull: true,
            comment: 'Meta title for SEO purposes for this event page.',
        },
        metaDescription: {
            type: DataTypes.STRING(300),
            allowNull: true,
            comment: 'Meta description for SEO purposes for this event page.',
        },
    }, {
        // Opciones del modelo de Sequelize
        timestamps: true, // Agrega `createdAt` y `updatedAt`
        tableName: 'HistoryEvents', // Nombre de la tabla en la base de datos
        comment: 'Table for storing major historical events.', // Comentario para la tabla
    });

    return HistoryEvent;
};