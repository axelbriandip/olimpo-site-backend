// src/models/news.model.js
// Definición del modelo para noticias o artículos del club

const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const News = sequelize.define('News', {
        // Identificador único de la noticia. Clave primaria y autoincrementa.
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            comment: 'Identificador único de la noticia.',
        },
        // Título de la noticia. No puede ser nulo y debe ser único.
        title: {
            type: DataTypes.STRING(75), // Límite de 75 caracteres
            allowNull: false,
            unique: true, // Asegura que no haya dos noticias con el mismo título
            comment: 'Título de la noticia (máx. 75 caracteres). Debe ser único.',
        },
        // Subtítulo o bajada de la noticia. Puede ser nulo.
        subtitle: {
            type: DataTypes.STRING(125), // Límite de 125 caracteres
            allowNull: true,
            comment: 'Subtítulo o bajada de la noticia (máx. 125 caracteres).',
        },
        // Resumen o extracto corto de la noticia. Útil para previsualizaciones.
        summary: {
            type: DataTypes.STRING(255), // Límite de 255 caracteres
            allowNull: true,
            comment: 'Resumen o extracto corto de la noticia para previsualizaciones (máx. 255 caracteres).',
        },
        // Contenido principal de la noticia.
        content: {
            type: DataTypes.STRING(1000), // Límite de 1000 caracteres
            allowNull: false,
            comment: 'Contenido principal de la noticia (máx. 1000 caracteres).',
        },
        // URL de la imagen principal destacada de la noticia. Puede ser nulo.
        featuredImageUrl: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: 'URL de la imagen principal destacada de la noticia.',
        },
        // Texto alternativo (alt text) para la imagen destacada (importante para SEO y accesibilidad).
        featuredImageAltText: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: 'Texto alternativo para la imagen destacada.',
        },
        // URL de un video relacionado con la noticia (ej. YouTube, Vimeo). Puede ser nulo.
        videoUrl: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: 'URL de un video relacionado con la noticia.',
        },
        // Un slug para URLs amigables. No puede ser nulo y debe ser único.
        slug: {
            type: DataTypes.STRING(255),
            allowNull: false, // El slug es crucial para URLs y SEO
            unique: true, // Asegura que el slug sea único
            comment: 'Slug amigable para URL de la noticia. Crucial para SEO.',
        },
        // Fecha de publicación de la noticia. Por defecto es la fecha de creación.
        publishedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW, // Por defecto, la fecha actual
            comment: 'Fecha y hora de publicación de la noticia.',
        },
        // Indica si la noticia está publicada y visible públicamente. Por defecto es true.
        is_published: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            comment: 'Indica si la noticia está publicada y visible públicamente.',
        },
        // Indica si la noticia está activa (para borrado suave). Por defecto es true.
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            comment: 'Indica si la noticia está activa (para borrado suave).',
        },
        // Autor de la noticia (ej. nombre del periodista o "Departamento de Prensa").
        author: {
            type: DataTypes.STRING(100),
            allowNull: true, // Puede ser nulo si el autor no se especifica siempre
            comment: 'Autor de la noticia.',
        },
        // Fuente externa de la noticia (ej. "Télam", "ESPN").
        source: {
            type: DataTypes.STRING(100),
            allowNull: true,
            comment: 'Fuente externa de la noticia.',
        },
        // Contador de visitas de la noticia.
        viewsCount: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            comment: 'Número de veces que la noticia ha sido vista.',
        },
        // Campos para SEO específicos de la noticia.
        metaTitle: {
            type: DataTypes.STRING(160),
            allowNull: true,
            comment: 'Meta título para propósitos de SEO para la página de esta noticia.',
        },
        metaDescription: {
            type: DataTypes.STRING(300),
            allowNull: true,
            comment: 'Meta descripción para propósitos de SEO para la página de esta noticia.',
        },
        // Palabras clave para SEO. Almacenadas como una cadena separada por comas.
        keywords: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: 'Palabras clave para SEO, separadas por comas (ej. "fútbol, river, superclásico").',
        },
    }, {
        // Opciones del modelo de Sequelize
        timestamps: true, // Agrega automáticamente las columnas `createdAt` y `updatedAt`
        tableName: 'News', // Nombre real de la tabla en la base de datos
        comment: 'Tabla para almacenar noticias y artículos del club.', // Comentario para la tabla
        // Los 'indexes' se han eliminado como solicitaste.
    });

    return News;
};