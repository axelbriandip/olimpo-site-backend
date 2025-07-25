// src/routes/sponsor.routes.js
const express = require('express');
const router = express.Router();
const sponsorController = require('../controllers/sponsor.controller');
const verifyToken = require('../middlewares/auth.middleware'); // Asume que tienes este middleware

// Rutas públicas (cualquiera puede obtener sponsors)
router.get('/', sponsorController.getAllSponsors);
router.get('/:id', sponsorController.getSponsorById);

// Rutas protegidas (requieren autenticación)
router.post('/', verifyToken, sponsorController.createSponsor);
router.put('/:id', verifyToken, sponsorController.updateSponsor);
router.put('/delete/:id', verifyToken, sponsorController.softDeleteSponsor); // Para borrado suave

module.exports = router;