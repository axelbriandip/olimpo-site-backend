// src/middlewares/monthlyPlayerUpload.middleware.js
const multer = require('multer');
const path = require('path');
const fs = require('fs-extra');

// Define la carpeta de destino para las imágenes de Jugadores del Mes
const MONTHLY_PLAYER_UPLOAD_DIR = path.join(__dirname, '../../public/uploads/monthly-players');

// Asegúrate de que la carpeta de destino exista
fs.ensureDirSync(MONTHLY_PLAYER_UPLOAD_DIR);

// Configuración de almacenamiento para Multer
const monthlyPlayerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, MONTHLY_PLAYER_UPLOAD_DIR);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = path.extname(file.originalname);
        const fileName = path.basename(file.originalname, fileExtension).replace(/\s/g, '_').slice(0, 50);
        cb(null, `${fileName}-${uniqueSuffix}${fileExtension}`);
    },
});

const monthlyPlayerFileFilter = (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Tipo de archivo no permitido para imágenes de Jugador del Mes. Solo se aceptan JPEG, PNG, GIF o WebP.'), false);
    }
};

const uploadMonthlyPlayer = multer({
    storage: monthlyPlayerStorage,
    fileFilter: monthlyPlayerFileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});

module.exports = uploadMonthlyPlayer;
