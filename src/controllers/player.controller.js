const Player = require('../models/player.model');

exports.getAllPlayers = async (req, res) => {
    const players = await Player.findAll();
    res.json(players);
};

exports.createPlayer = async (req, res) => {
    const { name, number, position, category } = req.body;
    const newPlayer = await Player.create({ name, number, position, category });
    res.status(201).json(newPlayer);
};

exports.deletePlayer = async (req, res) => {
    const { id } = req.params;
    await Player.destroy({ where: { id } });
    res.sendStatus(204);
};