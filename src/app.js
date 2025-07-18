// src/app.js
const express = require('express');
const app = express();

const playerRoutes = require('./routes/player.routes');
const newsRoutes = require('./routes/news.routes');
const categoryRoutes = require('./routes/category.routes');
const matchRoutes = require('./routes/match.routes');
const historyEvent = require('./routes/historyEvent.routes');
const identityRoutes = require('./routes/identity.routes');

app.use(express.json());

app.use('/api/players', playerRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/history', historyEvent);
app.use('/api/identity', identityRoutes);

module.exports = app;
