// src/routes/upload.routes.js
const express = require('express');
const router = express.Router();
const path = require('path');

// Importa los middlewares de Multer específicos
const uploadPlayer = require('../middlewares/upload.middleware'); // Para jugadores
const uploadNews = require('../middlewares/newsUpload.middleware'); // Para noticias
const uploadHistory = require('../middlewares/historyUpload.middleware'); // <--- NUEVO: Para historia

const verifyToken = require('../middlewares/auth.middleware'); // Para proteger estas rutas

// --- Rutas para Subida de Imágenes ---

// Ruta para subir fotos de JUGADORES (protegida por autenticación)
// Endpoint completo: POST /api/upload/players
router.post('/upload/players', verifyToken, uploadPlayer.single('image'), (req, res) => {
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

// Ruta para subir imágenes de NOTICIAS (protegida por autenticación)
// Endpoint completo: POST /api/upload/news
router.post('/upload/news', verifyToken, uploadNews.single('newsImage'), (req, res) => {
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

// NUEVA RUTA: Ruta para subir imágenes de HISTORIA (eventos y subsecciones)
// Endpoint completo: POST /api/upload/history/:type (donde :type es 'event' o 'subsection')
// El campo esperado por Multer es 'historyImage' (desde history.service.js)
router.post('/upload/history/:type', verifyToken, uploadHistory.single('historyImage'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No se ha subido ningún archivo para la historia.' });
    }
    const type = req.params.type; // 'event' o 'subsection'
    const imageUrl = `${process.env.BACKEND_URL || 'http://localhost:3000'}/uploads/history/${type}/${path.basename(req.file.path)}`;
    res.status(200).json({
        message: `Imagen de ${type} histórica subida exitosamente.`,
        fileName: req.file.filename,
        filePath: req.file.path,
        imageUrl: imageUrl // Esto coincide con lo que espera history.service.js
    });
});

module.exports = router;
