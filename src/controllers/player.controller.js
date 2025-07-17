const Player = require('../models/player.model');

const getAllPlayers = async (req, res) => {
    try {
        const players = await Player.findAll({
            where: { is_active: true },
        });
        res.json(players);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving players', error });
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
        res.status(500).json({ message: 'Error retrieving player', error });
    }
};

const createPlayer = async (req, res) => {
    try {
        const newPlayer = await Player.create(req.body);
        res.status(201).json(newPlayer);
    } catch (error) {
        res.status(500).json({ message: 'Error creating player', error });
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
        res.status(500).json({ message: 'Error updating player', error });
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
        res.status(500).json({ message: 'Error deactivating player', error });
    }
};

module.exports = {
    getAllPlayers,
    getPlayerById,
    createPlayer,
    updatePlayer,
    softDeletePlayer,
};
