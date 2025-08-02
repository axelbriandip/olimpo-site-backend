// src/routes/upload.routes.js
const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/auth.middleware');

// Importa el NUEVO y ÚNICO middleware de Firebase
const { upload, uploadToFirebase } = require('../middlewares/firebaseUpload.middleware');

// --- Rutas para Subida de Imágenes ---

// Middleware que aplica Multer y la subida a Firebase
// Se encadena Multer para procesar el archivo y luego el middleware de Firebase para subirlo
const handleFileUpload = (req, res, next) => {
    if (!req.fileUrl) {
        return res.status(400).json({ message: 'No se ha subido ningún archivo.' });
    }
    // Si la subida fue exitosa, la URL está en req.fileUrl
    const imageUrl = req.fileUrl;
    res.status(200).json({
        message: 'Imagen subida exitosamente.',
        imageUrl: imageUrl,
    });
};

// Ruta para subir fotos de JUGADORES
// Endpoint: POST /api/upload/players
// Campo esperado: 'imageFile'
router.post('/upload/players', verifyToken, upload.single('imageFile'), uploadToFirebase, handleFileUpload);

// Ruta para subir imágenes de NOTICIAS
// Endpoint: POST /api/upload/news
router.post('/upload/news', verifyToken, upload.single('imageFile'), uploadToFirebase, handleFileUpload);

// Ruta para subir imágenes de HISTORIA
// Endpoint: POST /api/upload/history/:type
router.post('/upload/history/:type', verifyToken, upload.single('imageFile'), uploadToFirebase, handleFileUpload);

// RUTAS PARA SUBIR IMÁGENES DE IDENTIDAD
// Endpoint: POST /api/upload/identity/:type
router.post('/upload/identity/:type', verifyToken, upload.single('imageFile'), uploadToFirebase, handleFileUpload);

// Ruta para subir imágenes de JUGADORES DEL MES
// Endpoint: POST /api/upload/monthly-player-image
router.post('/upload/monthly-player-image', verifyToken, upload.single('imageFile'), uploadToFirebase, handleFileUpload);

// Ruta para subir FOTOS DE TESTIMONIOS
// Endpoint: POST /api/upload/testimonial-photo
router.post('/upload/testimonial-photo', verifyToken, upload.single('imageFile'), uploadToFirebase, handleFileUpload);

// RUTAS para subir imágenes de SPONSORS
// Endpoint: POST /api/upload/sponsors/:type
router.post('/upload/sponsors/:type', verifyToken, upload.single('imageFile'), uploadToFirebase, handleFileUpload);

module.exports = router;
