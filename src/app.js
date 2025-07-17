const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas de jugadores
const playerRoutes = require('./routes/player.routes');
app.use('/api/players', playerRoutes);

// Rutas base de prueba
app.get('/', (req, res) => {
    res.send('🏃‍♂️ API Olimpo en marcha');
});

module.exports = app;