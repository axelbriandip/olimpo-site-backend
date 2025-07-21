// src/routes/team.routes.js
const express = require('express');
const router = express.Router();
const teamController = require('../controllers/team.controller');
const verifyToken = require('../middlewares/auth.middleware'); // Asegúrate de que esta ruta sea correcta

// Rutas públicas (cualquiera puede ver los equipos)
router.get('/', teamController.getAllTeams);
router.get('/:id', teamController.getTeamById);

// Rutas protegidas (requieren autenticación para crear/actualizar/borrar suavemente)
router.post('/', verifyToken, teamController.createTeam);
router.put('/:id', verifyToken, teamController.updateTeam);
router.put('/delete/:id', verifyToken, teamController.softDeleteTeam);

module.exports = router;