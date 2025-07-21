// src/routes/news.routes.js
const express = require('express');
const router = express.Router();
const newsController = require('../controllers/news.controller');
const verifyToken = require('../middlewares/auth.middleware'); // Asegúrate de que esta ruta sea correcta

// Rutas públicas (cualquiera puede ver las noticias)
router.get('/', newsController.getAllNews);
router.get('/:id', newsController.getNewsByIdOrSlug); // Ruta para buscar por ID o por slug

// Rutas protegidas (requieren autenticación para crear/actualizar/borrar suavemente)
router.post('/', verifyToken, newsController.createNews);
router.put('/:id', verifyToken, newsController.updateNews);
router.put('/delete/:id', verifyToken, newsController.softDeleteNews);

module.exports = router;
