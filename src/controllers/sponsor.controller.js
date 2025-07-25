// src/controllers/sponsor.controller.js
const { Sponsor } = require('../models'); // Importa el modelo Sponsor

// Obtener todos los sponsors activos
const getAllSponsors = async (req, res) => {
    try {
        const sponsors = await Sponsor.findAll({
            where: { is_active: true },
            order: [
                ['order', 'ASC'], // Ordena por el campo 'order' si existe
                ['name', 'ASC'] // Luego por nombre alfabéticamente
            ],
        });
        res.status(200).json(sponsors);
    } catch (error) {
        console.error('Error al obtener sponsors:', error);
        res.status(500).json({
            message: 'Error interno del servidor al obtener sponsors.',
            errorName: error.name,
            errorMessage: error.message,
        });
    }
};

// Obtener un sponsor por ID
const getSponsorById = async (req, res) => {
    try {
        const sponsor = await Sponsor.findByPk(req.params.id, {
            where: { is_active: true },
        });
        if (!sponsor || !sponsor.is_active) {
            return res.status(404).json({ message: 'Sponsor no encontrado o inactivo.' });
        }
        res.status(200).json(sponsor);
    } catch (error) {
        console.error('Error al obtener sponsor por ID:', error);
        res.status(500).json({
            message: 'Error interno del servidor al obtener sponsor por ID.',
            errorName: error.name,
            errorMessage: error.message,
        });
    }
};

// Crear un nuevo sponsor
const createSponsor = async (req, res) => {
    // Desestructura los nuevos campos del cuerpo de la solicitud
    const { name, logoUrl, logoUrlBlack, logoUrlWhite, websiteUrl, level, startDate, endDate, is_active, order } = req.body;
    try {
        const newSponsor = await Sponsor.create({
            name,
            logoUrl,
            logoUrlBlack, // Incluye el nuevo campo
            logoUrlWhite, // Incluye el nuevo campo
            websiteUrl,
            level,
            startDate,
            endDate,
            is_active: is_active !== undefined ? is_active : true,
            order,
        });
        res.status(201).json(newSponsor);
    } catch (error) {
        console.error('Error al crear sponsor:', error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ message: 'El nombre del sponsor ya existe.', errors: error.errors });
        }
        res.status(500).json({
            message: 'Error interno del servidor al crear sponsor.',
            errorName: error.name,
            errorMessage: error.message,
        });
    }
};

// Actualizar un sponsor existente
const updateSponsor = async (req, res) => {
    const { id } = req.params;
    // Desestructura los nuevos campos del cuerpo de la solicitud
    const { name, logoUrl, logoUrlBlack, logoUrlWhite, websiteUrl, level, startDate, endDate, is_active, order } = req.body;
    try {
        const sponsor = await Sponsor.findByPk(id);
        if (!sponsor) {
            return res.status(404).json({ message: 'Sponsor no encontrado.' });
        }

        const updateData = {
            name,
            logoUrl,
            logoUrlBlack, // Incluye el nuevo campo
            logoUrlWhite, // Incluye el nuevo campo
            websiteUrl,
            level,
            startDate,
            endDate,
            is_active,
            order
        };
        // Elimina los campos undefined para que Sequelize no intente actualizarlos a nulo
        Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);

        await sponsor.update(updateData);
        res.status(200).json(sponsor);
    } catch (error) {
        console.error('Error al actualizar sponsor:', error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ message: 'El nombre del sponsor ya existe.', errors: error.errors });
        }
        res.status(500).json({
            message: 'Error interno del servidor al actualizar sponsor.',
            errorName: error.name,
            errorMessage: error.message,
        });
    }
};

// Borrado suave de un sponsor (establece is_active en false)
const softDeleteSponsor = async (req, res) => {
    try {
        const sponsor = await Sponsor.findByPk(req.params.id);
        if (!sponsor) {
            return res.status(404).json({ message: 'Sponsor no encontrado.' });
        }
        if (!sponsor.is_active) {
            return res.status(400).json({ message: 'El sponsor ya está inactivo.' });
        }

        sponsor.is_active = false;
        await sponsor.save();
        res.status(200).json({ message: 'Sponsor desactivado exitosamente.' });
    } catch (error) {
        console.error('Error al desactivar sponsor:', error);
        res.status(500).json({
            message: 'Error interno del servidor al desactivar sponsor.',
            errorName: error.name,
            errorMessage: error.message,
        });
    }
};

module.exports = {
    getAllSponsors,
    getSponsorById,
    createSponsor,
    updateSponsor,
    softDeleteSponsor,
};
