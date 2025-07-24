// src/routes/identity.routes.js
const express = require('express');
const router = express.Router();
const identityController = require('../controllers/identity.controller');
const verifyToken = require('../middlewares/auth.middleware');

// Rutas públicas (cualquiera puede ver la identidad institucional)
// GET /api/identity
router.get('/', identityController.getIdentity);

// Rutas protegidas (requieren autenticación para crear/actualizar/borrar suavemente)

// Ruta para crear la identidad del club (solo si no existe una)
// POST /api/identity (Protegida)
router.post('/', verifyToken, identityController.createIdentity);

// Ruta para actualizar la identidad del club (Protegida)
// PUT /api/identity/:id  <--- CAMBIO AQUÍ: Ahora espera un ID
router.put('/:id', verifyToken, identityController.updateIdentity);

// Ruta para "desactivar" la identidad (borrado suave)
// PUT /api/identity/delete/:id <--- CAMBIO AQUÍ: Ahora espera un ID
router.put('/delete/:id', verifyToken, identityController.softDeleteIdentity);

module.exports = router;
