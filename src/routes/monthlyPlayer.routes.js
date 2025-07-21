// src/routes/monthlyPlayer.routes.js
const express = require('express');
const router = express.Router();
const monthlyPlayerController = require('../controllers/monthlyPlayer.controller');
const verifyToken = require('../middlewares/auth.middleware'); // Asegúrate de que esta ruta sea correcta

// Rutas públicas (cualquiera puede ver los Jugadores del Mes)
router.get('/', monthlyPlayerController.getAllMonthlyPlayers);
router.get('/:id', monthlyPlayerController.getMonthlyPlayerById);

// Rutas protegidas (requieren autenticación para crear/actualizar/borrar suavemente)
router.post('/', verifyToken, monthlyPlayerController.createMonthlyPlayer);
router.put('/:id', verifyToken, monthlyPlayerController.updateMonthlyPlayer);
router.put('/delete/:id', verifyToken, monthlyPlayerController.softDeleteMonthlyPlayer);

module.exports = router;