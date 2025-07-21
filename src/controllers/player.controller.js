// src/controllers/player.controller.js
// Controlador para las operaciones CRUD de Jugadores

const { Player } = require('../models'); // Importa el modelo Player

// Obtener todos los jugadores activos
const getAllPlayers = async (req, res) => {
    try {
        const players = await Player.findAll({
            where: { is_active: true }, // Filtra solo los jugadores activos
            order: [
                ['lastName', 'ASC'], // Ordena por apellido
                ['firstName', 'ASC'] // Luego por nombre
            ],
        });
        res.status(200).json(players);
    } catch (error) {
        console.error('Error al obtener jugadores:', error);
        res.status(500).json({
            message: 'Error interno del servidor al obtener jugadores.',
            errorName: error.name,
            errorMessage: error.message,
        });
    }
};

// Obtener un jugador por ID
const getPlayerById = async (req, res) => {
    try {
        const player = await Player.findByPk(req.params.id, {
            where: { is_active: true }, // Asegura que solo se obtiene jugadores activos
        });
        if (!player || !player.is_active) {
            return res.status(404).json({ message: 'Jugador no encontrado o inactivo.' });
        }
        res.status(200).json(player);
    } catch (error) {
        console.error('Error al obtener jugador por ID:', error);
        res.status(500).json({
            message: 'Error interno del servidor al obtener jugador por ID.',
            errorName: error.name,
            errorMessage: error.message,
        });
    }
};

// Crear un nuevo jugador
const createPlayer = async (req, res) => {
    // Desestructura todos los campos que el modelo Player ahora acepta
    const {
        firstName,
        lastName,
        position,
        number,
        dateOfBirth,
        cityOfBirth,
        stateOfBirth,
        nationality,
        preferredFoot,
        photoUrl,
        biography,
        instagramUrl,
        status,
        is_active,
        metaTitle,
        metaDescription,
    } = req.body;

    try {
        const newPlayer = await Player.create({
            firstName,
            lastName,
            position,
            number,
            dateOfBirth,
            cityOfBirth,
            stateOfBirth,
            nationality,
            preferredFoot,
            photoUrl,
            biography,
            instagramUrl,
            status: status !== undefined ? status : 'Activo', // Usa el status proporcionado o el valor por defecto
            is_active: is_active !== undefined ? is_active : true, // Permite especificar is_active, por defecto true
            metaTitle,
            metaDescription,
        });
        res.status(201).json(newPlayer); // 201 Created
    } catch (error) {
        console.error('Error al crear jugador:', error);
        res.status(500).json({
            message: 'Error interno del servidor al crear jugador.',
            errorName: error.name,
            errorMessage: error.message,
        });
    }
};

// Actualizar un jugador existente
const updatePlayer = async (req, res) => {
    const { id } = req.params;
    const {
        firstName,
        lastName,
        position,
        number,
        dateOfBirth,
        cityOfBirth,
        stateOfBirth,
        nationality,
        preferredFoot,
        photoUrl,
        biography,
        instagramUrl,
        status,
        is_active,
        metaTitle,
        metaDescription,
    } = req.body;

    try {
        const player = await Player.findByPk(id);
        if (!player) {
            return res.status(404).json({ message: 'Jugador no encontrado.' });
        }

        const updateData = {
            firstName,
            lastName,
            position,
            number,
            dateOfBirth,
            cityOfBirth,
            stateOfBirth,
            nationality,
            preferredFoot,
            photoUrl,
            biography,
            instagramUrl,
            status,
            is_active,
            metaTitle,
            metaDescription,
        };

        // Elimina los campos undefined para que Sequelize no intente actualizarlos a nulo
        Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);

        await player.update(updateData);
        res.status(200).json(player);
    } catch (error) {
        console.error('Error al actualizar jugador:', error);
        res.status(500).json({
            message: 'Error interno del servidor al actualizar jugador.',
            errorName: error.name,
            errorMessage: error.message,
        });
    }
};

// Borrado suave de un jugador (establece is_active en false)
const softDeletePlayer = async (req, res) => {
    try {
        const player = await Player.findByPk(req.params.id);
        if (!player) {
            return res.status(404).json({ message: 'Jugador no encontrado.' });
        }
        if (!player.is_active) {
            return res.status(400).json({ message: 'El jugador ya está inactivo.' });
        }

        player.is_active = false;
        await player.save();
        res.status(200).json({ message: 'Jugador desactivado exitosamente.' });
    } catch (error) {
        console.error('Error al desactivar jugador:', error);
        res.status(500).json({
            message: 'Error interno del servidor al desactivar jugador.',
            errorName: error.name,
            errorMessage: error.message,
        });
    }
};

module.exports = {
    getAllPlayers,
    getPlayerById,
    createPlayer,
    updatePlayer,
    softDeletePlayer,
};