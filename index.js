require('dotenv').config();
const app = require('./src/app');
const { sequelize } = require('./src/models'); // 👈 obtenelo desde models/index.js

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ force: true }); // { force: true } si querés resetear
        console.log('🟢 Database connected successfully.');

        app.listen(PORT, () => {
            console.log(`🚀 Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('🔴 Failed to connect to the database:', error);
    }
}

startServer();
