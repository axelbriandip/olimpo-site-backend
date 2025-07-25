// src/middlewares/sponsorUpload.middleware.js
const multer = require('multer');
const path = require('path');
const fs = require('fs-extra'); // Importa fs-extra para asegurar que la carpeta exista

// Configuración de almacenamiento para Multer para imágenes de Sponsors
const sponsorStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        // req.params.type vendrá de la URL (ej. 'main', 'black', 'white')
        const type = req.params.type;
        let uploadDir = path.join(__dirname, '../../public/uploads/sponsors'); // Directorio base para todos los logos de sponsors

        if (type === 'main') {
            uploadDir = path.join(uploadDir, 'main');
        } else if (type === 'black') {
            uploadDir = path.join(uploadDir, 'black');
        } else if (type === 'white') {
            uploadDir = path.join(uploadDir, 'white');
        } else {
            // Fallback o error si el tipo no es reconocido
            return cb(new Error('Tipo de logo de sponsor no válido.'), false);
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
const sponsorFileFilter = (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Tipo de archivo no permitido para imágenes de sponsor. Solo se aceptan JPEG, PNG, GIF o WebP.'), false);
    }
};

// Configuración final de Multer para Sponsors
const uploadSponsor = multer({
    storage: sponsorStorage,
    fileFilter: sponsorFileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // Limite de tamaño de archivo (5MB)
    },
});

module.exports = uploadSponsor;
