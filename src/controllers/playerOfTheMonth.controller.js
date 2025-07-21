// src/controllers/playerOfTheMonth.controller.js
const { PlayerOfTheMonth, Player } = require('../models'); // Importa ambos modelos

// Obtener todos los Jugadores del Mes activos
const getAllPlayersOfTheMonth = async (req, res) => {
    try {
        const playersOfTheMonth = await PlayerOfTheMonth.findAll({
            where: { is_active: true }, // Filtra por jugadores del mes activos
            include: [{
                model: Player,
                as: 'player', // Alias 'player' debe coincidir con el definido en src/models/index.js
                attributes: ['id', 'firstName', 'lastName', 'position', 'photoUrl'], // <--- ¡CORREGIDO A 'photoUrl'!
                where: { is_active: true }, // Asegura que solo traes jugadores activos
                required: true, // INNER JOIN: solo trae Jugadores del Mes si el jugador asociado existe y está activo
            }],
            order: [
                ['year', 'DESC'], // Ordena por año descendente
                ['month', 'DESC'], // Luego por mes descendente
            ],
        });
        res.json(playersOfTheMonth);
    } catch (error) {
        console.error('Error retrieving players of the month:', error);
        res.status(500).json({ message: 'Error retrieving players of the month', error: error.message });
    }
};

// Obtener un Jugador del Mes por ID
const getPlayerOfTheMonthById = async (req, res) => {
    try {
        const playerOfTheMonth = await PlayerOfTheMonth.findByPk(req.params.id, {
            where: { is_active: true }, // Filtra por activo
            include: [{
                model: Player,
                as: 'player',
                attributes: ['id', 'firstName', 'lastName', 'position', 'photoUrl'], // <--- ¡CORREGIDO A 'photoUrl'!
                where: { is_active: true },
                required: true,
            }],
        });
        if (!playerOfTheMonth || !playerOfTheMonth.is_active) {
            return res.status(404).json({ message: 'Player of the month not found' });
        }
        res.json(playerOfTheMonth);
    } catch (error) {
        console.error('Error retrieving player of the month by ID:', error);
        res.status(500).json({ message: 'Error retrieving player of the month', error: error.message });
    }
};

// Crear un nuevo Jugador del Mes
const createPlayerOfTheMonth = async (req, res) => {
    const { playerId, month, year, reason } = req.body;
    try {
        const newPlayerOfTheMonth = await PlayerOfTheMonth.create({
            playerId,
            month,
            year,
            reason
        });
        await newPlayerOfTheMonth.reload({
            include: [{
                model: Player,
                as: 'player',
                attributes: ['id', 'firstName', 'lastName', 'position', 'photoUrl'] // <--- ¡CORREGIDO A 'photoUrl'!
            }]
        });
        res.status(201).json(newPlayerOfTheMonth);
    } catch (error) {
        console.error('Error creating player of the month:', error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ message: 'This player has already been selected as Player of the Month for the given month and year.' });
        }
        res.status(500).json({ message: 'Error creating player of the month', error: error.message });
    }
};

// Actualizar un Jugador del Mes existente
const updatePlayerOfTheMonth = async (req, res) => {
    const { id } = req.params;
    const { playerId, month, year, reason } = req.body;
    try {
        const playerOfTheMonth = await PlayerOfTheMonth.findByPk(id, {
            where: { is_active: true }
        });

        if (!playerOfTheMonth || !playerOfTheMonth.is_active) {
            return res.status(404).json({ message: 'Player of the month not found' });
        }

        await playerOfTheMonth.update({ playerId, month, year, reason });
        await playerOfTheMonth.reload({
            include: [{
                model: Player,
                as: 'player',
                attributes: ['id', 'firstName', 'lastName', 'position', 'photoUrl'] // <--- ¡CORREGIDO A 'photoUrl'!
            }]
        });
        res.json(playerOfTheMonth);
    } catch (error) {
        console.error('Error updating player of the month:', error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ message: 'This player has already been selected as Player of the Month for the given month and year.' });
        }
        res.status(500).json({ message: 'Error updating player of the month', error: error.message });
    }
};

// Borrado suave de un Jugador del Mes
const softDeletePlayerOfTheMonth = async (req, res) => {
    try {
        const playerOfTheMonth = await PlayerOfTheMonth.findByPk(req.params.id);
        if (!playerOfTheMonth || !playerOfTheMonth.is_active) {
            return res.status(404).json({ message: 'Player of the month not found' });
        }
        playerOfTheMonth.is_active = false;
        await playerOfTheMonth.save();
        res.json({ message: 'Player of the month deactivated successfully' });
    } catch (error) {
        console.error('Error deactivating player of the month:', error);
        res.status(500).json({ message: 'Error deactivating player of the month', error: error.message });
    }
};

module.exports = {
    getAllPlayersOfTheMonth,
    getPlayerOfTheMonthById,
    createPlayerOfTheMonth,
    updatePlayerOfTheMonth,
    softDeletePlayerOfTheMonth,
};