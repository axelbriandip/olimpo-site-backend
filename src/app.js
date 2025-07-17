// src/app.js
const express = require('express');
const app = express();

const playerRoutes = require('./routes/player.routes');
const newsRoutes = require('./routes/news.routes');
const categoryRoutes = require('./routes/category.routes');

app.use(express.json());

app.use('/api/players', playerRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/categories', categoryRoutes);

module.exports = app;
