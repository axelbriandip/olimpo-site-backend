// src/controllers/team.controller.js
// Controlador para las operaciones CRUD de Equipos

const { Team } = require('../models'); // Importa el modelo Team

// Obtener todos los equipos activos
const getAllTeams = async (req, res) => {
    try {
        const teams = await Team.findAll({
            where: { is_active: true }, // Filtra solo los equipos activos
            order: [['name', 'ASC']], // Ordena los equipos alfabéticamente por nombre por defecto
        });
        res.status(200).json(teams);
    } catch (error) {
        console.error('Error al obtener equipos:', error);
        res.status(500).json({
            message: 'Error interno del servidor al obtener equipos.',
            errorName: error.name,
            errorMessage: error.message,
        });
    }
};

// Obtener un equipo por ID
const getTeamById = async (req, res) => {
    try {
        const team = await Team.findByPk(req.params.id, {
            where: { is_active: true }, // Asegura que solo se obtienen equipos activos
        });
        if (!team || !team.is_active) {
            return res.status(404).json({ message: 'Equipo no encontrado o inactivo.' });
        }
        res.status(200).json(team);
    } catch (error) {
        console.error('Error al obtener equipo por ID:', error);
        res.status(500).json({
            message: 'Error interno del servidor al obtener equipo por ID.',
            errorName: error.name,
            errorMessage: error.message,
        });
    }
};

// Crear un nuevo equipo
const createTeam = async (req, res) => {
    // Desestructura todos los campos que el modelo Team ahora acepta
    const {
        name,
        shortName,
        abbreviatedName,
        originalLogoUrl,
        whiteLogoUrl,
        blackLogoUrl,
        city,
        country,
        description,
        primaryColor,
        secondaryColor,
        websiteUrl,
        is_active,
        metaTitle,
        metaDescription,
    } = req.body;

    try {
        const newTeam = await Team.create({
            name,
            shortName,
            abbreviatedName,
            originalLogoUrl,
            whiteLogoUrl,
            blackLogoUrl,
            city,
            country,
            description,
            primaryColor,
            secondaryColor,
            websiteUrl,
            is_active: is_active !== undefined ? is_active : true, // Permite especificar is_active, por defecto true
            metaTitle,
            metaDescription,
        });
        res.status(201).json(newTeam); // 201 Created
    } catch (error) {
        console.error('Error al crear equipo:', error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ message: 'El nombre o el nombre abreviado del equipo ya existe.', errors: error.errors });
        }
        res.status(500).json({
            message: 'Error interno del servidor al crear equipo.',
            errorName: error.name,
            errorMessage: error.message,
        });
    }
};

// Actualizar un equipo existente
const updateTeam = async (req, res) => {
    const { id } = req.params;
    const {
        name,
        shortName,
        abbreviatedName,
        originalLogoUrl,
        whiteLogoUrl,
        blackLogoUrl,
        city,
        country,
        description,
        primaryColor,
        secondaryColor,
        websiteUrl,
        is_active,
        metaTitle,
        metaDescription,
    } = req.body;

    try {
        const team = await Team.findByPk(id);
        if (!team) {
            return res.status(404).json({ message: 'Equipo no encontrado.' });
        }

        const updateData = {
            name,
            shortName,
            abbreviatedName,
            originalLogoUrl,
            whiteLogoUrl,
            blackLogoUrl,
            city,
            country,
            description,
            primaryColor,
            secondaryColor,
            websiteUrl,
            is_active,
            metaTitle,
            metaDescription,
        };

        // Elimina los campos undefined para que Sequelize no intente actualizarlos a nulo
        Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);

        await team.update(updateData);
        res.status(200).json(team);
    } catch (error) {
        console.error('Error al actualizar equipo:', error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ message: 'El nombre o el nombre abreviado del equipo ya existe.', errors: error.errors });
        }
        res.status(500).json({
            message: 'Error interno del servidor al actualizar equipo.',
            errorName: error.name,
            errorMessage: error.message,
        });
    }
};

// Borrado suave de un equipo (establece is_active en false)
const softDeleteTeam = async (req, res) => {
    try {
        const team = await Team.findByPk(req.params.id);
        if (!team) {
            return res.status(404).json({ message: 'Equipo no encontrado.' });
        }
        if (!team.is_active) {
            return res.status(400).json({ message: 'El equipo ya está inactivo.' });
        }

        team.is_active = false;
        await team.save();
        res.status(200).json({ message: 'Equipo desactivado exitosamente.' });
    } catch (error) {
        console.error('Error al desactivar equipo:', error);
        res.status(500).json({
            message: 'Error interno del servidor al desactivar equipo.',
            errorName: error.name,
            errorMessage: error.message,
        });
    }
};

module.exports = {
    getAllTeams,
    getTeamById,
    createTeam,
    updateTeam,
    softDeleteTeam,
};