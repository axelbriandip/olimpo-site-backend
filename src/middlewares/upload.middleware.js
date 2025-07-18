// src/middlewares/upload.middleware.js
const multer = require('multer');
const path = require('path');
const fs = require('fs-extra'); // Para asegurar que la carpeta exista

// Define la carpeta de destino para las imágenes de jugadores
const UPLOAD_DIR = path.join(__dirname, '../../public/uploads/players');

// Asegúrate de que la carpeta de destino exista
fs.ensureDirSync(UPLOAD_DIR); // Crea la carpeta si no existe

// Configuración de almacenamiento para Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOAD_DIR); // Define la carpeta donde se guardarán los archivos
    },
    filename: (req, file, cb) => {
        // Genera un nombre de archivo único para evitar colisiones
        // Nombre: timestamp-nombre_original_sin_espacios.ext
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = path.extname(file.originalname);
        const fileName = file.originalname.split('.')[0].replace(/\s/g, '_'); // Elimina espacios del nombre original
        cb(null, `${fileName}-${uniqueSuffix}${fileExtension}`);
    },
});

// Filtro para aceptar solo ciertos tipos de archivos (imágenes)
const fileFilter = (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true); // Acepta el archivo
    } else {
        cb(new Error('Tipo de archivo no permitido. Solo se aceptan imágenes JPEG, PNG, GIF o WebP.'), false); // Rechaza el archivo
    }
};

// Configuración final de Multer
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // Limite de tamaño de archivo (5MB)
    },
});

module.exports = upload;