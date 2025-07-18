// src/routes/category.routes.js
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const verifyToken = require('../middlewares/auth.middleware'); // <-- Importa

// publics
router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);

// protecteds
router.post('/', verifyToken, categoryController.createCategory);
router.put('/:id', verifyToken, categoryController.updateCategory);
router.delete('/:id', verifyToken, categoryController.deleteCategory);

module.exports = router;
