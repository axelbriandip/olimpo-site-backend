// src/models/index.js
const sequelize = require('../config/db');

const News = require('./news.model');
const Category = require('./category.model');
const Match = require('./match.model');

// Definir asociaciones aquí
News.belongsToMany(Category, {
    through: 'NewsCategories',
    as: 'categories', // Este alias es el que se usa en los includes
    foreignKey: 'newsId',
    otherKey: 'categoryId'
});

Category.belongsToMany(News, {
    through: 'NewsCategories',
    as: 'news',
    foreignKey: 'categoryId',
    otherKey: 'newsId'
});

module.exports = {
    sequelize,
    News,
    Category,
    Match
};
