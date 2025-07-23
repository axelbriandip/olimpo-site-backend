// src/controllers/auth.controller.js
const { User } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Para acceder a las variables de entorno, como JWT_SECRET

// Función para registrar un nuevo usuario (admin)
// En un escenario de un solo admin, esto se usaría una vez para crear el primer usuario.
const registerUser = async (req, res) => {
    const { username, password, email } = req.body;
    try {
        // Opcional: Si solo permites UN usuario, puedes verificar si ya existe uno
        const existingUser = await User.findOne();
        if (existingUser) {
            return res.status(409).json({ message: 'A user already exists. Only one admin user is allowed.' });
        }

        const newUser = await User.create({ username, password, email });
        // No devolver la contraseña hasheada
        const userResponse = newUser.toJSON();
        delete userResponse.password;

        res.status(201).json({ message: 'User registered successfully', user: userResponse });
    } catch (error) {
        console.error('Error registering user:', error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ message: 'Username or Email already in use.' });
        }
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
};

// Función para el login de usuario
const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        // 1. Buscar el usuario por username
        const user = await User.findOne({ where: { username, is_active: true } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // 2. Comparar la contraseña ingresada con la hasheada
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // 3. Generar un JWT
        // Asegúrate de tener una variable de entorno JWT_SECRET en tu .env
        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1d' } // El token expira en 1 hora
        );

        // No devolver la contraseña hasheada
        const userResponse = user.toJSON();
        delete userResponse.password;

        res.json({ message: 'Logged in successfully', token, user: userResponse });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Error logging in user', error: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
};