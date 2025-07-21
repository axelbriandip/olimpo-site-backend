// src/models/category.model.js
// Definición del modelo para las categorías de contenido (ej. "Fútbol", "Básquet", "Institucional")

const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        // Identificador único de la categoría. Es la clave primaria y se autoincrementa.
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            comment: 'Unique identifier for the category.',
        },
        // Nombre de la categoría. Debe ser único y no puede ser nulo.
        // Ejemplos: "Fútbol", "Básquet", "Institucional".
        name: {
            type: DataTypes.STRING(100), // Limitar longitud para nombres de categoría
            allowNull: false,
            unique: true, // Asegura que no haya dos categorías con el mismo nombre
            comment: 'Name of the category (e.g., "Football", "Basketball", "Institutional"). Must be unique.',
        },
        // Descripción detallada de la categoría. Puede ser nula.
        description: {
            type: DataTypes.TEXT, // Permite texto más largo
            allowNull: true,
            comment: 'Detailed description of the category.',
        },
        // Slug para URLs amigables. Derivado del nombre, debe ser único y en minúsculas.
        // Ejemplos: "futbol", "basquet-masculino". Útil para SEO.
        slug: {
            type: DataTypes.STRING(120), // Un poco más largo que el nombre por si hay guiones
            allowNull: true, // Puede ser nulo si se genera automáticamente o no se usa
            unique: true, // Asegura que el slug sea único para URLs limpias
            comment: 'URL-friendly slug for the category (e.g., "football", "mens-basketball"). Useful for SEO.',
        },
        // URL a un ícono representativo de la categoría. Puede ser nula.
        // Ejemplos: un balón de fútbol, una canasta de baloncesto.
        iconUrl: {
            type: DataTypes.STRING(255), // Suficiente para una URL
            allowNull: true,
            comment: 'URL to an icon representing the category.',
        },
        // URL a una imagen destacada o banner para la categoría. Puede ser nula.
        // Útil para banners en páginas de categoría o previews.
        imageUrl: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: 'URL to a featured image or banner for the category.',
        },
        // Color asociado a la categoría (en formato hexadecimal). Puede ser nulo.
        // Útil para estilos visuales en la interfaz de usuario.
        color: {
            type: DataTypes.STRING(7), // Para códigos HEX como "#RRGGBB"
            allowNull: true,
            comment: 'Hexadecimal color code associated with the category (e.g., "#FF0000").',
        },
        // Indica si la categoría está activa y visible públicamente. Por defecto es true.
        // Permite "desactivar" categorías sin eliminarlas de la base de datos (soft delete).
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            comment: 'Indicates if the category is active and publicly visible. Used for soft deletion.',
        },
        // Título meta para SEO. Puede ser nulo.
        // Aparece en la pestaña del navegador y es importante para el ranking de búsqueda.
        metaTitle: {
            type: DataTypes.STRING(160), // Longitud recomendada para meta títulos
            allowNull: true,
            comment: 'Meta title for SEO purposes (appears in browser tab).',
        },
        // Descripción meta para SEO. Puede ser nula.
        // Aparece en los resultados de búsqueda debajo del título.
        metaDescription: {
            type: DataTypes.STRING(300), // Longitud recomendada para meta descripciones
            allowNull: true,
            comment: 'Meta description for SEO purposes (appears in search results).',
        },
    }, {
        // Opciones del modelo de Sequelize
        timestamps: true, // Agrega automáticamente las columnas `createdAt` y `updatedAt`
        tableName: 'Categories', // Nombre de la tabla en la base de datos (convención plural)
        comment: 'Table for storing different content categories (e.g., news, events).', // Comentario para la tabla],
    });

    return Category; // Retorna el modelo definido
};