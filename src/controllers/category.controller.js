// src/controllers/category.controller.js
// Controlador para las operaciones CRUD (Crear, Leer, Actualizar, Borrar) de Categorías

const { Category, User } = require('../models'); // Importa el modelo Category y User (si lo vas a incluir)

// Obtener todas las categorías activas
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll({
            where: { is_active: true }, // Filtra solo las categorías activas
            order: [['name', 'ASC']], // Ordena las categorías alfabéticamente por nombre por defecto
            // Si quisieras incluir información del usuario que la creó/actualizó:
            // include: [
            //     { model: User, as: 'creator', attributes: ['id', 'username'] },
            //     { model: User, as: 'updater', attributes: ['id', 'username'] },
            // ],
        });
        res.status(200).json(categories);
    } catch (error) {
        console.error('Error al obtener categorías:', error);
        res.status(500).json({
            message: 'Error interno del servidor al obtener categorías.',
            errorName: error.name,
            errorMessage: error.message,
        });
    }
};

// Obtener una categoría por ID
const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id, {
            where: { is_active: true }, // Asegura que solo se obtienen categorías activas
            // Si quisieras incluir información del usuario que la creó/actualizó:
            // include: [
            //     { model: User, as: 'creator', attributes: ['id', 'username'] },
            //     { model: User, as: 'updater', attributes: ['id', 'username'] },
            // ],
        });
        if (!category || !category.is_active) {
            return res.status(404).json({ message: 'Categoría no encontrada o inactiva.' });
        }
        res.status(200).json(category);
    } catch (error) {
        console.error('Error al obtener categoría por ID:', error);
        res.status(500).json({
            message: 'Error interno del servidor al obtener categoría por ID.',
            errorName: error.name,
            errorMessage: error.message,
        });
    }
};

// Crear una nueva categoría
const createCategory = async (req, res) => {
    // Desestructura todos los campos que el modelo Category ahora acepta
    const {
        name,
        description,
        slug,
        iconUrl,
        imageUrl,
        color,
        is_active,
        metaTitle,
        metaDescription,
        createdBy, // Si se pasa en el body, o se obtiene de req.user.id
    } = req.body;

    try {
        // Puedes generar el slug automáticamente si no se proporciona
        const finalSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-*|-*$/g, '');

        // Si usas autenticación y quieres asignar el creador automáticamente:
        // const creatorId = req.user ? req.user.id : createdBy; // Asume que req.user.id es el ID del usuario autenticado

        const newCategory = await Category.create({
            name,
            description,
            slug: finalSlug,
            iconUrl,
            imageUrl,
            color,
            is_active: is_active !== undefined ? is_active : true, // Permite especificar is_active, por defecto true
            metaTitle,
            metaDescription,
            createdBy: createdBy, // Usar el ID del usuario autenticado o el del body
        });
        res.status(201).json(newCategory); // 201 Created
    } catch (error) {
        console.error('Error al crear categoría:', error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ message: 'El nombre o el slug de la categoría ya existe.', errors: error.errors });
        }
        res.status(500).json({
            message: 'Error interno del servidor al crear categoría.',
            errorName: error.name,
            errorMessage: error.message,
        });
    }
};

// Actualizar una categoría existente
const updateCategory = async (req, res) => {
    const { id } = req.params;
    const {
        name,
        description,
        slug,
        iconUrl,
        imageUrl,
        color,
        is_active,
        metaTitle,
        metaDescription,
        updatedBy, // Si se pasa en el body, o se obtiene de req.user.id
    } = req.body;

    try {
        const category = await Category.findByPk(id);
        if (!category) {
            return res.status(404).json({ message: 'Categoría no encontrada.' });
        }

        // Si usas autenticación y quieres asignar el actualizador automáticamente:
        // const updaterId = req.user ? req.user.id : updatedBy; // Asume que req.user.id es el ID del usuario autenticado

        // Prepara el objeto con los campos a actualizar
        const updateData = {
            name,
            description,
            slug,
            iconUrl,
            imageUrl,
            color,
            is_active,
            metaTitle,
            metaDescription,
            updatedBy: updatedBy, // Usar el ID del usuario autenticado o el del body
        };

        // Elimina los campos undefined para que Sequelize no intente actualizarlos a nulo si no se proporcionan
        Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);

        await category.update(updateData);
        res.status(200).json(category);
    } catch (error) {
        console.error('Error al actualizar categoría:', error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ message: 'El nombre o el slug de la categoría ya existe.', errors: error.errors });
        }
        res.status(500).json({
            message: 'Error interno del servidor al actualizar categoría.',
            errorName: error.name,
            errorMessage: error.message,
        });
    }
};

// Borrado suave de una categoría (establece is_active en false)
const softDeleteCategory = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Categoría no encontrada.' });
        }
        if (!category.is_active) {
            return res.status(400).json({ message: 'La categoría ya está inactiva.' });
        }

        category.is_active = false;
        await category.save();
        res.status(200).json({ message: 'Categoría desactivada exitosamente.' });
    } catch (error) {
        console.error('Error al desactivar categoría:', error);
        res.status(500).json({
            message: 'Error interno del servidor al desactivar categoría.',
            errorName: error.name,
            errorMessage: error.message,
        });
    }
};

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    softDeleteCategory
};