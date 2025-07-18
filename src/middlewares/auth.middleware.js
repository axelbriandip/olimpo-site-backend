// src/middleware/auth.middleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Asegúrate de cargar las variables de entorno

const verifyToken = (req, res, next) => {
    // 1. Obtener el token del encabezado de la petición
    // El token generalmente viene como "Bearer TOKEN_JWT_AQUI"
    const authHeader = req.headers['authorization'];

    // Si no hay encabezado de autorización o no empieza con "Bearer ", denegar acceso
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Access Denied: No token provided or invalid format.' });
    }

    // Extraer solo el token (eliminar "Bearer ")
    const token = authHeader.split(' ')[1];

    if (!token) {
        // Esto es redundante si el startsWith ya lo validó, pero por seguridad extra
        return res.status(401).json({ message: 'Access Denied: Token missing.' });
    }

    try {
        // 2. Verificar el token usando la clave secreta
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 3. Adjuntar la información decodificada (id del usuario, username) al objeto request
        req.user = decoded; // Ahora el controlador puede acceder a req.user.id, req.user.username

        // 4. Continuar con la siguiente función de middleware o la ruta
        next();
    } catch (error) {
        console.error('Error verifying token:', error.message);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Access Denied: Token expired.' });
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Access Denied: Invalid token.' });
        }
        res.status(500).json({ message: 'Internal Server Error during token verification.' });
    }
};

module.exports = verifyToken;