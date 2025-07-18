// src/routes/auth.routes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.post('/register', authController.registerUser); // Para crear el admin inicial
router.post('/login', authController.loginUser);

module.exports = router;