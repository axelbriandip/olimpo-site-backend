// src/middlewares/newsUpload.middleware.js
const multer = require('multer');
const path = require('path');
const fs = require('fs-extra'); // Importa fs-extra para asegurar que la carpeta exista

// Define la carpeta de destino para las imágenes de NOTICIAS
// La ruta es relativa desde 'src/middlewares' hasta 'public/uploads/news'
const NEWS_UPLOAD_DIR = path.join(__dirname, '../../public/uploads/news');

// Asegúrate de que la carpeta de destino para noticias exista
// Si no existe, fs-extra la creará automáticamente
fs.ensureDirSync(NEWS_UPLOAD_DIR);

// Configuración de almacenamiento para Multer para NOTICIAS
const newsStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, NEWS_UPLOAD_DIR); // Define la carpeta donde se guardarán los archivos de noticias
    },
    filename: (req, file, cb) => {
        // Genera un nombre de archivo único para evitar colisiones
        // Nombre: nombre_original_sin_espacios-timestamp-random.ext
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = path.extname(file.originalname);
        // Limpia el nombre original, reemplaza espacios y limita la longitud
        const fileName = path.basename(file.originalname, fileExtension).replace(/\s/g, '_').slice(0, 50);
        cb(null, `${fileName}-${uniqueSuffix}${fileExtension}`);
    },
});

// Filtro para aceptar solo ciertos tipos de archivos (imágenes) para NOTICIAS
const newsFileFilter = (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true); // Acepta el archivo
    } else {
        cb(new Error('Tipo de archivo no permitido para noticias. Solo se aceptan imágenes JPEG, PNG, GIF o WebP.'), false); // Rechaza el archivo
    }
};

// Configuración final de Multer para NOTICIAS
const uploadNews = multer({
    storage: newsStorage,
    fileFilter: newsFileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // Limite de tamaño de archivo (5MB)
    },
});

module.exports = uploadNews;