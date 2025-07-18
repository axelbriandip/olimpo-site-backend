// src/models/news.model.js
// No necesitas importar sequelize aquí si lo recibes como parámetro.
// Solo necesitas DataTypes.
const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => { // <--- **DEBE EXPORTAR UNA FUNCIÓN**
    const News = sequelize.define('News', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        // Si tienes un campo para la imagen de la noticia, iría aquí
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        publicationDate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        // otros campos
    }, {
        timestamps: true, // createdAt, updatedAt
        tableName: 'News' // Asegúrate de que el nombre de la tabla sea consistente
    });

    // Si estás usando el patrón de asociaciones en index.js,
    // NO definas News.associate aquí.
    // Pero si quisieras usar el patrón .associate, lo harías así:
    /*
    News.associate = (models) => {
      News.belongsToMany(models.Category, {
        through: 'NewsCategories',
        as: 'categories',
        foreignKey: 'newsId',
        otherKey: 'categoryId'
      });
    };
    */

    return News; // <--- **DEBE DEVOLVER EL MODELO DEFINIDO**
};