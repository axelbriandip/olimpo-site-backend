// src/routes/identity.routes.js
const express = require('express');
const router = express.Router();
const identityController = require('../controllers/identity.controller');
const verifyToken = require('../middlewares/auth.middleware'); // <-- Importa

// Ruta pública (cualquiera puede ver la identidad del club)
router.get('/', identityController.getIdentity);

// Ruta protegida (solo para admin autenticado)
router.put('/', verifyToken, identityController.updateIdentity); // <-- Protegido

module.exports = router;