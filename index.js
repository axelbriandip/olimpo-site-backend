// index.js (en la raíz de tu proyecto backend)
require('dotenv').config();
const app = require('./src/app');
const sequelize = require('./src/config/db'); // Importa la instancia de sequelize
const models = require('./src/models'); // Asegura que todos los modelos se carguen y asocien

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        // Autentica la conexión a la base de datos
        await sequelize.authenticate();
        console.log('🟢 Database connection has been established successfully.');

        // ---------------------------------------------------------------------
        // ¡IMPORTANTE PARA PRODUCCIÓN!
        // No uses sequelize.sync() aquí en producción. Las migraciones deben manejar el esquema.
        // Si estás desplegando por primera vez y quieres que las tablas se creen,
        // puedes ejecutar una migración inicial o usar `sequelize.sync({ force: true })`
        // una vez en un entorno de desarrollo/staging para generar el esquema inicial,
        // y luego usar migraciones para los cambios.
        // En un entorno de CI/CD, las migraciones se ejecutarían como un paso separado.
        // ---------------------------------------------------------------------
        // await sequelize.sync({ alter: true }); // Comentado para producción
        // await sequelize.sync({ force: true }); // Comentado para producción
        // console.log('🟢 Database synchronized successfully.'); // Esta línea también se comentaría si no usas sync

        // Inicia el servidor Express
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on http://localhost:${PORT}`);
            // En producción, BACKEND_URL será la URL pública de tu API
            console.log(`Access your backend at: ${process.env.BACKEND_URL || `http://localhost:${PORT}`}`);
        });
    } catch (error) {
        console.error('🔴 Failed to connect to the database or start server:', error);
        process.exit(1); // Termina el proceso si hay un error crítico
    }
}

startServer();
