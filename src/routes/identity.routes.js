// src/routes/identity.routes.js
const express = require('express');
const router = express.Router();
const identityController = require('../controllers/identity.controller');
const verifyToken = require('../middlewares/auth.middleware'); // Asegúrate de que esta ruta sea correcta

// Rutas públicas (cualquiera puede ver la identidad institucional)
router.get('/', identityController.getIdentity);

// Rutas protegidas (requieren autenticación para crear/actualizar/borrar suavemente)
// Nota: Dado que la identidad es un registro único, no se usa un ID en la URL para POST/PUT/DELETE
// La función createIdentity debería ser llamada solo una vez.
router.post('/', verifyToken, identityController.createIdentity);
router.put('/', verifyToken, identityController.updateIdentity); // PUT sin ID, asume que actualiza el único registro
router.put('/delete', verifyToken, identityController.softDeleteIdentity); // PUT sin ID, asume que desactiva el único registro

module.exports = router;