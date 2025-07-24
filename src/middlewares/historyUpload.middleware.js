// src/middlewares/historyUpload.middleware.js
const multer = require('multer');
const path = require('path');
const fs = require('fs-extra'); // Importa fs-extra para asegurar que la carpeta exista

// Configuración de almacenamiento para Multer para imágenes de Historia
const historyStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        // req.params.type vendrá de la URL (ej. 'event' o 'subsection')
        const type = req.params.type;
        let uploadDir;

        if (type === 'event') {
            uploadDir = path.join(__dirname, '../../public/uploads/history/events');
        } else if (type === 'subsection') {
            uploadDir = path.join(__dirname, '../../public/uploads/history/subsections');
        } else {
            // Fallback o error si el tipo no es reconocido
            return cb(new Error('Tipo de subida de historia no válido.'), false);
        }

        // Asegúrate de que la carpeta de destino exista
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

// Filtro para aceptar solo imágenes
const historyFileFilter = (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Tipo de archivo no permitido para imágenes históricas. Solo se aceptan JPEG, PNG, GIF o WebP.'), false);
    }
};

// Configuración final de Multer para Historia
const uploadHistory = multer({
    storage: historyStorage,
    fileFilter: historyFileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // Limite de tamaño de archivo (5MB)
    },
});

module.exports = uploadHistory;
