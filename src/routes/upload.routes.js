// src/routes/upload.routes.js
const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload.middleware'); // Nuestro middleware Multer
const verifyToken = require('../middlewares/auth.middleware'); // Para proteger esta ruta
const path = require('path');

// Ruta para subir imágenes (protegida por autenticación)
// 'image' es el nombre del campo en el formulario (multipart/form-data) que contendrá el archivo
router.post('/upload', verifyToken, upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No se ha subido ningún archivo.' });
    }

    // Construye la URL pública del archivo
    // Asume que tu servidor Express sirve la carpeta 'public' estáticamente
    const fileUrl = `${process.env.BACKEND_URL || 'http://localhost:3000'}/uploads/players/${path.basename(req.file.path)}`;

    res.status(200).json({
        message: 'Archivo subido exitosamente.',
        fileName: req.file.filename,
        filePath: req.file.path, // Ruta interna en el servidor
        fileUrl: fileUrl // URL pública para el frontend
    });
});

module.exports = router;