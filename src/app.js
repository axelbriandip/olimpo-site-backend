const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas base de prueba
app.get('/', (req, res) => {
    res.send('🏃‍♂️ API Olimpo en marcha');
});

module.exports = app;