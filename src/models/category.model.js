// src/models/category.model.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => { // Exporta una función que recibe sequelize y DataTypes
    const Category = sequelize.define('Category', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, // Asumo que los nombres de categoría deben ser únicos
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    }, {
        timestamps: true, // Para createdAt y updatedAt
        tableName: 'Categories' // Asegúrate de que coincida con el nombre de tu tabla en la DB
    });

    // Si utilizas las asociaciones centralizadas en index.js, no necesitas .associate aquí.
    // Pero si en el futuro decides usarlo, sería así:
    /*
    Category.associate = (models) => {
      Category.belongsToMany(models.News, {
        through: 'NewsCategories',
        as: 'news',
        foreignKey: 'categoryId',
        otherKey: 'newsId'
      });
    };
    */

    return Category; // Retorna el modelo definido
};