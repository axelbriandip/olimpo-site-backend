// src/routes/player.routes.js
const express = require('express');
const router = express.Router();
const playerController = require('../controllers/player.controller');
const verifyToken = require('../middlewares/auth.middleware'); // Asegúrate de que esta ruta sea correcta

// Rutas públicas (cualquiera puede ver los jugadores)
router.get('/', playerController.getAllPlayers);
router.get('/:id', playerController.getPlayerById);

// Rutas protegidas (requieren autenticación para crear/actualizar/borrar suavemente)
router.post('/', verifyToken, playerController.createPlayer);
router.put('/:id', verifyToken, playerController.updatePlayer);
router.put('/delete/:id', verifyToken, playerController.softDeletePlayer);

module.exports = router;