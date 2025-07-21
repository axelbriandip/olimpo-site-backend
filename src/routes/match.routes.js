// src/routes/match.routes.js
const express = require('express');
const router = express.Router();
const matchController = require('../controllers/match.controller');
const verifyToken = require('../middlewares/auth.middleware'); // Asegúrate de que esta ruta sea correcta

// Rutas públicas (cualquiera puede ver los partidos)
router.get('/', matchController.getAllMatches);
router.get('/:id', matchController.getMatchById);

// Rutas protegidas (requieren autenticación para crear/actualizar/borrar suavemente)
router.post('/', verifyToken, matchController.createMatch);
router.put('/:id', verifyToken, matchController.updateMatch);
router.put('/delete/:id', verifyToken, matchController.softDeleteMatch);

module.exports = router;