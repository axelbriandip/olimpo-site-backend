// src/controllers/monthlyPlayer.controller.js
// Controlador para las operaciones CRUD de Jugador del Mes

const { MonthlyPlayer, Player } = require('../models'); // Importa ambos modelos

// Obtener todos los reconocimientos de Jugador del Mes activos
const getAllMonthlyPlayers = async (req, res) => {
    try {
        const monthlyPlayers = await MonthlyPlayer.findAll({
            where: { is_active: true }, // Filtra solo los reconocimientos activos
            include: [{
                model: Player,
                as: 'player', // Alias definido en src/models/index.js
                attributes: ['id', 'firstName', 'lastName', 'position', 'number', 'photoUrl', 'dateOfBirth'], // Atributos del jugador a incluir
                required: true, // INNER JOIN: solo trae reconocimientos si el jugador existe
            }],
            order: [
                ['year', 'DESC'], // Ordena por año descendente
                ['month', 'DESC'], // Luego por mes descendente
            ],
        });
        res.status(200).json(monthlyPlayers);
    } catch (error) {
        console.error('Error al obtener Jugadores del Mes:', error);
        res.status(500).json({
            message: 'Error interno del servidor al obtener Jugadores del Mes.',
            errorName: error.name,
            errorMessage: error.message,
        });
    }
};

// Obtener un reconocimiento de Jugador del Mes por ID
const getMonthlyPlayerById = async (req, res) => {
    try {
        const monthlyPlayer = await MonthlyPlayer.findByPk(req.params.id, {
            where: { is_active: true }, // Asegura que solo se obtiene reconocimientos activos
            include: [{
                model: Player,
                as: 'player',
                attributes: ['id', 'firstName', 'lastName', 'position', 'number', 'photoUrl', 'dateOfBirth'],
                required: true,
            }],
        });
        if (!monthlyPlayer || !monthlyPlayer.is_active) {
            return res.status(404).json({ message: 'Reconocimiento de Jugador del Mes no encontrado o inactivo.' });
        }
        res.status(200).json(monthlyPlayer);
    } catch (error) {
        console.error('Error al obtener Jugador del Mes por ID:', error);
        res.status(500).json({
            message: 'Error interno del servidor al obtener Jugador del Mes por ID.',
            errorName: error.name,
            errorMessage: error.message,
        });
    }
};

// Crear un nuevo reconocimiento de Jugador del Mes
const createMonthlyPlayer = async (req, res) => {
    const {
        playerId,
        year,
        month,
        reason,
        imageUrl,
        videoUrl,
        is_active,
        metaTitle,
        metaDescription,
    } = req.body;

    try {
        // Opcional: Verificar que el playerId exista
        const player = await Player.findByPk(playerId);
        if (!player) {
            return res.status(400).json({ message: 'El jugador especificado no existe.' });
        }

        // Opcional: Verificar que no exista ya un Jugador del Mes para ese mismo mes y año
        const existingRecognition = await MonthlyPlayer.findOne({
            where: { playerId, year, month, is_active: true }
        });
        if (existingRecognition) {
            return res.status(409).json({ message: 'Ya existe un reconocimiento de Jugador del Mes para este jugador en el mismo mes y año.' });
        }

        const newMonthlyPlayer = await MonthlyPlayer.create({
            playerId,
            year,
            month,
            reason,
            imageUrl,
            videoUrl,
            is_active: is_active !== undefined ? is_active : true,
            metaTitle,
            metaDescription,
        });

        // Recarga para incluir los datos del jugador en la respuesta
        await newMonthlyPlayer.reload({
            include: [{
                model: Player,
                as: 'player',
                attributes: ['id', 'firstName', 'lastName', 'position', 'number', 'photoUrl']
            }]
        });

        res.status(201).json(newMonthlyPlayer); // 201 Created
    } catch (error) {
        console.error('Error al crear Jugador del Mes:', error);
        res.status(500).json({
            message: 'Error interno del servidor al crear Jugador del Mes.',
            errorName: error.name,
            errorMessage: error.message,
        });
    }
};

// Actualizar un reconocimiento de Jugador del Mes existente
const updateMonthlyPlayer = async (req, res) => {
    const { id } = req.params;
    const {
        playerId,
        year,
        month,
        reason,
        imageUrl,
        videoUrl,
        is_active,
        metaTitle,
        metaDescription,
    } = req.body;

    try {
        const monthlyPlayer = await MonthlyPlayer.findByPk(id);
        if (!monthlyPlayer) {
            return res.status(404).json({ message: 'Reconocimiento de Jugador del Mes no encontrado.' });
        }

        // Opcional: Verificar que el nuevo playerId exista si se está cambiando
        if (playerId && playerId !== monthlyPlayer.playerId) {
            const player = await Player.findByPk(playerId);
            if (!player) return res.status(400).json({ message: 'El nuevo jugador especificado no existe.' });
        }

        // Opcional: Verificar duplicados si se cambian el mes/año/jugador
        if ((year && year !== monthlyPlayer.year) || (month && month !== monthlyPlayer.month) || (playerId && playerId !== monthlyPlayer.playerId)) {
            const existingRecognition = await MonthlyPlayer.findOne({
                where: {
                    playerId: playerId || monthlyPlayer.playerId,
                    year: year || monthlyPlayer.year,
                    month: month || monthlyPlayer.month,
                    is_active: true,
                    id: { [MonthlyPlayer.sequelize.Op.ne]: id } // Excluir el propio registro que se está actualizando
                }
            });
            if (existingRecognition) {
                return res.status(409).json({ message: 'Ya existe un reconocimiento de Jugador del Mes para este jugador en el mismo mes y año.' });
            }
        }

        const updateData = {
            playerId,
            year,
            month,
            reason,
            imageUrl,
            videoUrl,
            is_active,
            metaTitle,
            metaDescription,
        };

        // Elimina los campos undefined para que Sequelize no intente actualizarlos a nulo
        Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);

        await monthlyPlayer.update(updateData);

        // Recarga para incluir los datos del jugador en la respuesta
        await monthlyPlayer.reload({
            include: [{
                model: Player,
                as: 'player',
                attributes: ['id', 'firstName', 'lastName', 'position', 'number', 'photoUrl']
            }]
        });

        res.status(200).json(monthlyPlayer);
    } catch (error) {
        console.error('Error al actualizar Jugador del Mes:', error);
        res.status(500).json({
            message: 'Error interno del servidor al actualizar Jugador del Mes.',
            errorName: error.name,
            errorMessage: error.message,
        });
    }
};

// Borrado suave de un reconocimiento de Jugador del Mes (establece is_active en false)
const softDeleteMonthlyPlayer = async (req, res) => {
    try {
        const monthlyPlayer = await MonthlyPlayer.findByPk(req.params.id);
        if (!monthlyPlayer) {
            return res.status(404).json({ message: 'Reconocimiento de Jugador del Mes no encontrado.' });
        }
        if (!monthlyPlayer.is_active) {
            return res.status(400).json({ message: 'El reconocimiento de Jugador del Mes ya está inactivo.' });
        }

        monthlyPlayer.is_active = false;
        await monthlyPlayer.save();
        res.status(200).json({ message: 'Reconocimiento de Jugador del Mes desactivado exitosamente.' });
    } catch (error) {
        console.error('Error al desactivar Jugador del Mes:', error);
        res.status(500).json({
            message: 'Error interno del servidor al desactivar Jugador del Mes.',
            errorName: error.name,
            errorMessage: error.message,
        });
    }
};

module.exports = {
    getAllMonthlyPlayers,
    getMonthlyPlayerById,
    createMonthlyPlayer,
    updateMonthlyPlayer,
    softDeleteMonthlyPlayer,
};