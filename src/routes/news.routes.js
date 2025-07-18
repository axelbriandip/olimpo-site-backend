const express = require('express');
const router = express.Router();
const newsController = require('../controllers/news.controller');
const verifyToken = require('../middlewares/auth.middleware');

// Rutas públicas (cualquiera puede ver las noticias)
router.get('/', newsController.getAllNews);
router.get('/:id', newsController.getNewsById);

// Rutas protegidas (solo para admin autenticado)
// Usamos verifyToken antes del controlador para proteger estas rutas
router.post('/', verifyToken, newsController.createNews); // <-- Protegido
router.put('/:id', verifyToken, newsController.updateNews); // <-- Protegido
router.put('/delete/:id', verifyToken, newsController.deleteNews); // <-- Protegido

module.exports = router;