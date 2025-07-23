// src/app.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path'); // Importa path
require('dotenv').config(); // Carga las variables de entorno

const authRoutes = require('./routes/auth.routes');
const categoryRoutes = require('./routes/category.routes');
const historyEventRoutes = require('./routes/historyEvent.routes');
const identityRoutes = require('./routes/identity.routes');
const matchRoutes = require('./routes/match.routes');
const newsRoutes = require('./routes/news.routes');
const playerRoutes = require('./routes/player.routes');
const monthlyPlayer = require('./routes/monthlyPlayer.routes');
const testimonialRoutes = require('./routes/testimonial.routes');
const uploadRoutes = require('./routes/upload.routes');
const historySubsectionRoutes = require('./routes/historySubsection.routes');
const teamsRoutes = require('./routes/team.routes');

const app = express();

// Middlewares
app.use(cors()); // Habilita CORS
app.use(express.json()); // Permite a Express parsear JSON en el body de las peticiones
app.use(express.urlencoded({ extended: true })); // Para parsear URL-encoded data (como datos de formularios)
app.use(morgan('dev')); // Logger de peticiones HTTP

// Configurar Express para servir archivos estáticos desde la carpeta 'public'
// Esto hará que http://localhost:3000/uploads/players/nombre_imagen.jpg funcione
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/history-events', historyEventRoutes);
app.use('/api/identity', identityRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/players', playerRoutes);
app.use('/api/monthly-player', monthlyPlayer);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api', uploadRoutes);
app.use('/api/history-subsections', historySubsectionRoutes);
app.use('/api/teams', teamsRoutes);

module.exports = app;