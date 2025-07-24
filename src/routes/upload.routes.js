// src/routes/upload.routes.js
const express = require('express');
const router = express.Router();
const path = require('path');

// Importa los middlewares de Multer específicos
const uploadPlayer = require('../middlewares/upload.middleware'); // Para jugadores
const uploadNews = require('../middlewares/newsUpload.middleware'); // Para noticias
const uploadHistory = require('../middlewares/historyUpload.middleware'); // Para historia (eventos/subsecciones)
const uploadIdentity = require('../middlewares/identityUpload.middleware'); // Para identidad (logo/hero/mission/vision/values)
const uploadMonthlyPlayer = require('../middlewares/monthlyPlayerUpload.middleware'); // <--- NUEVO: Para Jugadores del Mes
const uploadTestimonial = require('../middlewares/testimonialUpload.middleware'); // <--- NUEVO: Para Testimonios

const verifyToken = require('../middlewares/auth.middleware'); // Para proteger estas rutas

// --- Rutas para Subida de Imágenes ---

// Ruta para subir fotos de JUGADORES
// Endpoint: POST /api/upload/players
// Campo esperado por Multer: 'imageFile'
router.post('/upload/players', verifyToken, uploadPlayer.single('imageFile'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No se ha subido ningún archivo para el jugador.' });
    }
    const fileUrl = `${process.env.BACKEND_URL || 'http://localhost:3000'}/uploads/players/${path.basename(req.file.path)}`;
    res.status(200).json({
        message: 'Imagen de jugador subida exitosamente.',
        fileName: req.file.filename,
        filePath: req.file.path,
        fileUrl: fileUrl
    });
});

// Ruta para subir imágenes de NOTICIAS
// Endpoint: POST /api/upload/news
// Campo esperado por Multer: 'imageFile'
router.post('/upload/news', verifyToken, uploadNews.single('imageFile'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No se ha subido ningún archivo para la noticia.' });
    }
    const imageUrl = `${process.env.BACKEND_URL || 'http://localhost:3000'}/uploads/news/${path.basename(req.file.path)}`;
    res.status(200).json({
        message: 'Imagen de noticia subida exitosamente.',
        fileName: req.file.filename,
        filePath: req.file.path,
        imageUrl: imageUrl
    });
});

// Ruta para subir imágenes de HISTORIA (eventos y subsecciones)
// Endpoint: POST /api/upload/history/:type (donde :type es 'event' o 'subsection')
// Campo esperado por Multer: 'imageFile'
router.post('/upload/history/:type', verifyToken, uploadHistory.single('imageFile'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No se ha subido ningún archivo para la historia.' });
    }
    const type = req.params.type;
    const imageUrl = `${process.env.BACKEND_URL || 'http://localhost:3000'}/uploads/history/${type}/${path.basename(req.file.path)}`;
    res.status(200).json({
        message: `Imagen de ${type} histórica subida exitosamente.`,
        fileName: req.file.filename,
        filePath: req.file.path,
        imageUrl: imageUrl
    });
});

// RUTAS PARA SUBIR IMÁGENES DE IDENTIDAD (logo, hero, misión, visión, valores)
// Endpoint: POST /api/upload/identity/:type (donde :type es 'logo', 'hero', 'mission', 'vision', 'values')
// Campo esperado por Multer: 'imageFile'
router.post('/upload/identity/:type', verifyToken, uploadIdentity.single('imageFile'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No se ha subido ningún archivo para la identidad.' });
    }
    const type = req.params.type;
    const imageUrl = `${process.env.BACKEND_URL || 'http://localhost:3000'}/uploads/identity/${type}/${path.basename(req.file.path)}`;
    res.status(200).json({
        message: `Imagen de identidad (${type}) subida exitosamente.`,
        fileName: req.file.filename,
        filePath: req.file.path,
        imageUrl: imageUrl
    });
});

// NUEVA RUTA: Para subir imágenes de JUGADORES DEL MES
// Endpoint: POST /api/upload/monthly-player-image
// Campo esperado por Multer: 'imageFile'
router.post('/upload/monthly-player-image', verifyToken, uploadMonthlyPlayer.single('imageFile'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No se ha subido ningún archivo para el jugador del mes.' });
    }
    const imageUrl = `${process.env.BACKEND_URL || 'http://localhost:3000'}/uploads/monthly-players/${path.basename(req.file.path)}`;
    res.status(200).json({
        message: 'Imagen de jugador del mes subida exitosamente.',
        fileName: req.file.filename,
        filePath: req.file.path,
        imageUrl: imageUrl
    });
});

// NUEVA RUTA: Para subir FOTOS DE TESTIMONIOS
// Endpoint: POST /api/upload/testimonial-photo
// Campo esperado por Multer: 'imageFile'
router.post('/upload/testimonial-photo', verifyToken, uploadTestimonial.single('imageFile'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No se ha subido ningún archivo para el testimonio.' });
    }
    const imageUrl = `${process.env.BACKEND_URL || 'http://localhost:3000'}/uploads/testimonials/${path.basename(req.file.path)}`;
    res.status(200).json({
        message: 'Foto de testimonio subida exitosamente.',
        fileName: req.file.filename,
        filePath: req.file.path,
        imageUrl: imageUrl
    });
});

module.exports = router;
