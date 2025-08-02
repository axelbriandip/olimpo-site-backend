// src/middlewares/firebaseUpload.middleware.js
const multer = require('multer');
const { initializeApp } = require('firebase/app');
const { getStorage, ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Reemplaza con las credenciales de tu proyecto de Firebase.
// Es MUY importante que uses variables de entorno para esto en producción.
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
};

// Inicializa Firebase
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

// Multer se encarga de procesar el archivo y mantenerlo en memoria (buffer)
// antes de que lo enviemos a Firebase Storage.
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // Limite de 5MB
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Tipo de archivo no permitido.'), false);
        }
    },
});

// Middleware para subir el archivo a Firebase Storage
const uploadToFirebase = async (req, res, next) => {
    try {
        if (!req.file) {
            return next();
        }

        const file = req.file;
        const filename = `${uuidv4()}-${path.basename(file.originalname)}`;

        // Determina la carpeta de destino basada en la URL.
        // Esto hace que el middleware sea genérico para todas las rutas.
        let uploadFolder;
        const urlParts = req.originalUrl.split('/');

        if (urlParts.includes('players')) uploadFolder = 'players';
        else if (urlParts.includes('news')) uploadFolder = 'news';
        else if (urlParts.includes('history')) uploadFolder = `history/${req.params.type}`;
        else if (urlParts.includes('identity')) uploadFolder = `identity/${req.params.type}`;
        else if (urlParts.includes('monthly-player-image')) uploadFolder = 'monthly-players';
        else if (urlParts.includes('testimonial-photo')) uploadFolder = 'testimonials';
        else if (urlParts.includes('sponsors')) uploadFolder = `sponsors/${req.params.type}`;
        else {
            // Manejar un caso por defecto o un error si no se encuentra la carpeta
            console.error('Carpeta de subida no reconocida.');
            return res.status(500).json({ message: "Error interno del servidor: Carpeta de subida no reconocida." });
        }

        const storageRef = ref(storage, `${uploadFolder}/${filename}`);
        const snapshot = await uploadBytes(storageRef, file.buffer);
        const fileUrl = await getDownloadURL(snapshot.ref);

        req.fileUrl = fileUrl; // Adjuntamos la URL al objeto de la petición
        next();
    } catch (error) {
        console.error("Error al subir el archivo a Firebase Storage:", error);
        res.status(500).json({ message: "Error al subir el archivo a Firebase Storage." });
    }
};

module.exports = { upload, uploadToFirebase };
