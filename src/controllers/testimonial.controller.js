// src/controllers/testimonial.controller.js
const { Testimonial } = require('../models');

// Obtener todos los testimonios activos
const getAllTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.findAll({
            where: { is_active: true },
            order: [['createdAt', 'DESC']], // Ordena por los más recientes primero
        });
        res.json(testimonials);
    } catch (error) {
        console.error('Error retrieving testimonials:', error);
        res.status(500).json({ message: 'Error retrieving testimonials', error: error.message });
    }
};

// Obtener un testimonio por ID
const getTestimonialById = async (req, res) => {
    try {
        const testimonial = await Testimonial.findByPk(req.params.id, {
            where: { is_active: true }
        });
        if (!testimonial || !testimonial.is_active) {
            return res.status(404).json({ message: 'Testimonial not found' });
        }
        res.json(testimonial);
    } catch (error) {
        console.error('Error retrieving testimonial by ID:', error);
        res.status(500).json({ message: 'Error retrieving testimonial', error: error.message });
    }
};

// Crear un nuevo testimonio
const createTestimonial = async (req, res) => {
    const { authorName, authorRole, text, photo, rating, date } = req.body;
    try {
        const newTestimonial = await Testimonial.create({
            authorName,
            authorRole,
            text,
            photo,
            rating,
            date
        });
        res.status(201).json(newTestimonial);
    } catch (error) {
        console.error('Error creating testimonial:', error);
        res.status(500).json({ message: 'Error creating testimonial', error: error.message });
    }
};

// Actualizar un testimonio existente
const updateTestimonial = async (req, res) => {
    const { id } = req.params;
    const { authorName, authorRole, text, photo, rating, date } = req.body;
    try {
        const testimonial = await Testimonial.findByPk(id, {
            where: { is_active: true }
        });

        if (!testimonial || !testimonial.is_active) {
            return res.status(404).json({ message: 'Testimonial not found' });
        }

        await testimonial.update({ authorName, authorRole, text, photo, rating, date });
        res.json(testimonial);
    } catch (error) {
        console.error('Error updating testimonial:', error);
        res.status(500).json({ message: 'Error updating testimonial', error: error.message });
    }
};

// Borrado suave de un testimonio
const softDeleteTestimonial = async (req, res) => {
    try {
        const testimonial = await Testimonial.findByPk(req.params.id);
        if (!testimonial || !testimonial.is_active) {
            return res.status(404).json({ message: 'Testimonial not found' });
        }
        testimonial.is_active = false;
        await testimonial.save();
        res.json({ message: 'Testimonial deactivated successfully' });
    } catch (error) {
        console.error('Error deactivating testimonial:', error);
        res.status(500).json({ message: 'Error deactivating testimonial', error: error.message });
    }
};

module.exports = {
    getAllTestimonials,
    getTestimonialById,
    createTestimonial,
    updateTestimonial,
    softDeleteTestimonial,
};