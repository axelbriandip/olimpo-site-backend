// src/routes/upload.routes.js
const express = require('express');
const router = express.Router();
const path = require('path');

// Importa los middlewares de Multer específicos
const uploadPlayer = require('../middlewares/upload.middleware'); // Tu middleware existente para jugadores
const uploadNews = require('../middlewares/newsUpload.middleware'); // El nuevo middleware para noticias

const verifyToken = require('../middlewares/auth.middleware'); // Para proteger estas rutas

// --- Rutas para Subida de Imágenes ---

// Ruta para subir fotos de JUGADORES (protegida por autenticación)
// Endpoint completo: POST /api/upload/players
// 'image' es el nombre del campo en el formulario (multipart/form-data) que contendrá el archivo
router.post('/upload/players', verifyToken, uploadPlayer.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No se ha subido ningún archivo para el jugador.' });
    }

    // Construye la URL pública del archivo
    // Asume que tu servidor Express sirve la carpeta 'public' estáticamente
    const fileUrl = `${process.env.BACKEND_URL || 'http://localhost:3000'}/uploads/players/${path.basename(req.file.path)}`;

    res.status(200).json({
        message: 'Imagen de jugador subida exitosamente.',
        fileName: req.file.filename,
        filePath: req.file.path, // Ruta interna en el servidor
        fileUrl: fileUrl // URL pública para el frontend
    });
});

// Ruta para subir imágenes de NOTICIAS (protegida por autenticación)
// Endpoint completo: POST /api/upload/news
// 'newsImage' es el nombre del campo que contendrá el archivo para noticias (desde news.service.js)
router.post('/upload/news', verifyToken, uploadNews.single('newsImage'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No se ha subido ningún archivo para la noticia.' });
    }

    const imageUrl = `${process.env.BACKEND_URL || 'http://localhost:3000'}/uploads/news/${path.basename(req.file.path)}`;

    res.status(200).json({
        message: 'Imagen de noticia subida exitosamente.',
        fileName: req.file.filename,
        filePath: req.file.path,
        imageUrl: imageUrl // URL pública para el frontend (coincide con lo que espera news.service.js)
    });
});

module.exports = router;
