// src/controllers/player.controller.js
const { Player } = require('../models'); // ¡CORREGIDO: Importa Player del objeto de modelos principal!

const getAllPlayers = async (req, res) => {
    console.log('Intentando obtener todos los jugadores...');
    try {
        const players = await Player.findAll({
            where: { is_active: true }, // Asegúrate de que la columna 'is_active' exista en tu DB
        });
        console.log('Jugadores obtenidos exitosamente. Cantidad:', players.length);
        res.status(200).json(players); // Cambiado a 200 y json
    } catch (error) {
        console.error('##########################################################');
        console.error('ERROR AL OBTENER JUGADORES EN player.controller.js:');
        console.error('Nombre del error:', error.name);
        console.error('Mensaje del error:', error.message);
        console.error('Stack Trace:', error.stack);
        console.error('##########################################################');
        res.status(500).json({
            message: 'Error interno del servidor al obtener jugadores.',
            errorName: error.name,
            errorMessage: error.message,
        });
    }
};

const getPlayerById = async (req, res) => {
    try {
        const player = await Player.findByPk(req.params.id);
        if (!player || !player.is_active) {
            return res.status(404).json({ message: 'Player not found' });
        }
        res.json(player);
    } catch (error) {
        console.error('Error al obtener jugador por ID:', error);
        res.status(500).json({ message: 'Error retrieving player', error: error.message });
    }
};

const createPlayer = async (req, res) => {
    try {
        const newPlayer = await Player.create(req.body);
        res.status(201).json(newPlayer);
    } catch (error) {
        console.error('Error al crear jugador:', error);
        res.status(500).json({ message: 'Error creating player', error: error.message });
    }
};

const updatePlayer = async (req, res) => {
    try {
        const player = await Player.findByPk(req.params.id);
        if (!player || !player.is_active) {
            return res.status(404).json({ message: 'Player not found' });
        }
        await player.update(req.body);
        res.json(player);
    } catch (error) {
        console.error('Error al actualizar jugador:', error);
        res.status(500).json({ message: 'Error updating player', error: error.message });
    }
};

const softDeletePlayer = async (req, res) => {
    try {
        const player = await Player.findByPk(req.params.id);
        if (!player || !player.is_active) {
            return res.status(404).json({ message: 'Player not found' });
        }
        player.is_active = false;
        await player.save();
        res.json({ message: 'Player deactivated successfully' });
    } catch (error) {
        console.error('Error al desactivar jugador:', error);
        res.status(500).json({ message: 'Error deactivating player', error: error.message });
    }
};

module.exports = {
    getAllPlayers,
    getPlayerById,
    createPlayer,
    updatePlayer,
    softDeletePlayer,
};