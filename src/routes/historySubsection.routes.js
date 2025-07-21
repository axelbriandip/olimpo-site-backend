// src/routes/historySubsection.routes.js
const express = require('express');
const router = express.Router();
const historySubsectionController = require('../controllers/historySubsections.controller');
const verifyToken = require('../middlewares/auth.middleware'); // Asegúrate de que esta ruta sea correcta

// Rutas públicas (cualquiera puede ver las subsecciones históricas)
router.get('/', historySubsectionController.getAllHistorySubsections);
router.get('/:id', historySubsectionController.getHistorySubsectionById);

// Rutas protegidas (requieren autenticación para crear/actualizar/borrar suavemente)
router.post('/', verifyToken, historySubsectionController.createHistorySubsection);
router.put('/:id', verifyToken, historySubsectionController.updateHistorySubsection);
router.put('/delete/:id', verifyToken, historySubsectionController.softDeleteHistorySubsection);

module.exports = router;