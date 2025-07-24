// src/middlewares/identityUpload.middleware.js
const multer = require('multer');
const path = require('path');
const fs = require('fs-extra');

// Configuración de almacenamiento para Multer para imágenes de Identidad
const identityStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        // req.params.type vendrá de la URL (ej. 'logo', 'hero', 'mission', 'vision', 'values')
        const type = req.params.type; // Ahora esperamos un :type en la URL
        let uploadDir;

        if (type === 'logo') {
            uploadDir = path.join(__dirname, '../../public/uploads/identity/logo');
        } else if (type === 'hero') {
            uploadDir = path.join(__dirname, '../../public/uploads/identity/hero');
        } else if (type === 'mission') { // NUEVO
            uploadDir = path.join(__dirname, '../../public/uploads/identity/mission');
        } else if (type === 'vision') { // NUEVO
            uploadDir = path.join(__dirname, '../../public/uploads/identity/vision');
        } else if (type === 'values') { // NUEVO
            uploadDir = path.join(__dirname, '../../public/uploads/identity/values');
        } else {
            // Fallback o error si el tipo no es reconocido
            return cb(new Error('Tipo de subida de identidad no válido.'), false);
        }

        fs.ensureDirSync(uploadDir);
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = path.extname(file.originalname);
        const fileName = path.basename(file.originalname, fileExtension).replace(/\s/g, '_').slice(0, 50);
        cb(null, `${fileName}-${uniqueSuffix}${fileExtension}`);
    },
});

const identityFileFilter = (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Tipo de archivo no permitido para imágenes de identidad. Solo se aceptan JPEG, PNG, GIF o WebP.'), false);
    }
};

const uploadIdentity = multer({
    storage: identityStorage,
    fileFilter: identityFileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});

module.exports = uploadIdentity;
