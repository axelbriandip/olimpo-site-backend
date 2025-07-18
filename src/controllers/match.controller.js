const Match = require('../models/match.model');

// Crear partido
exports.createMatch = async (req, res) => {
    try {
        const match = await Match.create(req.body);
        res.status(201).json(match);
    } catch (error) {
        console.error('🔴 Error creating match:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Obtener todos los partidos activos
exports.getAllMatches = async (req, res) => {
    try {
        const matches = await Match.findAll({ where: { is_active: true } });
        res.json(matches);
    } catch (error) {
        console.error('🔴 Error fetching matches:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Obtener partido por ID
exports.getMatchById = async (req, res) => {
    try {
        const match = await Match.findOne({
            where: {
                id: req.params.id,
                is_active: true
            }
        });
        if (!match) return res.status(404).json({ error: 'Match not found' });
        res.json(match);
    } catch (error) {
        console.error('🔴 Error fetching match:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Actualizar partido
exports.updateMatch = async (req, res) => {
    try {
        const match = await Match.findByPk(req.params.id);
        if (!match || !match.is_active) return res.status(404).json({ error: 'Match not found' });

        await match.update(req.body);
        res.json(match);
    } catch (error) {
        console.error('🔴 Error updating match:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Soft delete (set is_active = false)
exports.deleteMatch = async (req, res) => {
    try {
        const match = await Match.findByPk(req.params.id);
        if (!match || !match.is_active) return res.status(404).json({ error: 'Match not found' });

        await match.update({ is_active: false });
        res.json({ message: 'Match soft deleted successfully' });
    } catch (error) {
        console.error('🔴 Error deleting match:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
