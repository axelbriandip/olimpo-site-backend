// src/controllers/match.controller.js
// Controlador para las operaciones CRUD de Partidos

const { Match, Team } = require('../models'); // Importa el modelo Match y Team
const { Op } = require('sequelize'); // Importar Op para operadores de Sequelize

// Obtener todos los partidos activos
const getAllMatches = async (req, res) => {
    try {
        const matches = await Match.findAll({
            where: { is_active: true }, // Filtra solo los partidos activos
            include: [
                {
                    model: Team,
                    as: 'homeTeam', // Alias para el equipo local, definido en la asociación
                    attributes: ['id', 'name', 'originalLogoUrl'],
                    required: true, // INNER JOIN: solo trae partidos si el equipo local existe
                },
                {
                    model: Team,
                    as: 'awayTeam', // Alias para el equipo visitante, definido en la asociación
                    attributes: ['id', 'name', 'originalLogoUrl'],
                    required: true, // INNER JOIN: solo trae partidos si el equipo visitante existe
                },
            ],
            order: [
                ['order', 'ASC'], // <-- NUEVO: Ordena primero por el campo 'order' de forma ascendente
                ['dateTime', 'ASC'], // <-- CAMBIADO: Luego por fecha y hora ascendente para próximos
                ['id', 'ASC'] // <-- NUEVO: Como desempate final
            ],
        });
        res.status(200).json(matches);
    } catch (error) {
        console.error('Error al obtener partidos:', error);
        res.status(500).json({
            message: 'Error interno del servidor al obtener partidos.',
            errorName: error.name,
            errorMessage: error.message,
        });
    }
};

// Obtener un partido por ID
const getMatchById = async (req, res) => {
    try {
        const match = await Match.findByPk(req.params.id, {
            where: { is_active: true }, // Asegura que solo se obtienen partidos activos
            include: [
                {
                    model: Team,
                    as: 'homeTeam',
                    attributes: ['id', 'name', 'originalLogoUrl'],
                    required: true,
                },
                {
                    model: Team,
                    as: 'awayTeam',
                    attributes: ['id', 'name', 'originalLogoUrl'],
                    required: true,
                },
            ],
            // El ordenamiento no es tan crítico para una búsqueda por PK, pero lo mantengo por consistencia
            order: [
                ['order', 'ASC'],
                ['dateTime', 'ASC'],
                ['id', 'ASC']
            ],
        });
        if (!match || !match.is_active) {
            return res.status(404).json({ message: 'Partido no encontrado o inactivo.' });
        }
        res.status(200).json(match);
    } catch (error) {
        console.error('Error al obtener partido por ID:', error);
        res.status(500).json({
            message: 'Error interno del servidor al obtener partido por ID.',
            errorName: error.name,
            errorMessage: error.message,
        });
    }
};

// Crear un nuevo partido
const createMatch = async (req, res) => {
    const {
        dateTime,
        category, // Ya estaba, solo para confirmación
        homeTeamId,
        homeTeamScore,
        awayTeamId,
        awayTeamScore,
        location,
        matchType,
        status,
        round,
        highlightsUrl,
        liveStreamUrl,
        description,
        is_active,
        metaTitle,
        metaDescription,
        // No desestructuramos 'order' aquí porque lo calcularemos
    } = req.body;

    try {
        // Opcional: Verificar que los TeamId existan antes de crear el partido
        const homeTeam = await Team.findByPk(homeTeamId);
        const awayTeam = await Team.findByPk(awayTeamId);
        if (!homeTeam || !awayTeam) {
            return res.status(400).json({ message: 'Uno o ambos equipos (local/visitante) no existen.' });
        }

        // --- Lógica para asignar el campo 'order' automáticamente ---
        let nextOrderValue;
        const lastMatch = await Match.findOne({
            order: [['order', 'DESC']], // Busca el partido con el order más alto
            attributes: ['order'], // Solo necesitamos el campo 'order'
            where: { is_active: true } // Opcional: solo considerar partidos activos para el orden
        });

        if (lastMatch && lastMatch.order !== null && lastMatch.order !== undefined) {
            // Si hay partidos y el último tiene un 'order' válido, suma 5
            nextOrderValue = lastMatch.order + 5;
        } else {
            // Si no hay partidos o el 'order' del último es nulo/indefinido, empieza en 5
            nextOrderValue = 5;
        }
        // --- Fin de la lógica para asignar 'order' ---

        const newMatch = await Match.create({
            dateTime,
            category, // Asegúrate de que category se pasa
            homeTeamId,
            homeTeamScore,
            awayTeamId,
            awayTeamScore,
            location,
            matchType,
            status,
            round,
            highlightsUrl,
            liveStreamUrl,
            description,
            is_active: is_active !== undefined ? is_active : true,
            metaTitle,
            metaDescription,
            order: nextOrderValue, // <-- ASIGNAMOS EL VALOR CALCULADO AQUÍ
        });

        // Recarga el objeto para incluir los datos completos de los equipos en la respuesta
        await newMatch.reload({
            include: [
                { model: Team, as: 'homeTeam', attributes: ['id', 'name', 'originalLogoUrl'] },
                { model: Team, as: 'awayTeam', attributes: ['id', 'name', 'originalLogoUrl'] },
            ],
        });

        res.status(201).json(newMatch); // 201 Created
    } catch (error) {
        console.error('Error al crear partido:', error);
        res.status(500).json({
            message: 'Error interno del servidor al crear partido.',
            errorName: error.name,
            errorMessage: error.message,
        });
    }
};

// Actualizar un partido existente
const updateMatch = async (req, res) => {
    const { id } = req.params;
    const {
        dateTime,
        homeTeamId,
        homeTeamScore,
        awayTeamId,
        awayTeamScore,
        location,
        matchType,
        status,
        round,
        highlightsUrl,
        liveStreamUrl,
        description,
        order,
        is_active,
        metaTitle,
        metaDescription,
    } = req.body;

    try {
        const match = await Match.findByPk(id);
        if (!match) {
            return res.status(404).json({ message: 'Partido no encontrado.' });
        }

        // Opcional: Verificar que los nuevos TeamId existan si se están cambiando
        if (homeTeamId && homeTeamId !== match.homeTeamId) {
            const homeTeam = await Team.findByPk(homeTeamId);
            if (!homeTeam) return res.status(400).json({ message: 'El nuevo equipo local no existe.' });
        }
        if (awayTeamId && awayTeamId !== match.awayTeamId) {
            const awayTeam = await Team.findByPk(awayTeamId);
            if (!awayTeam) return res.status(400).json({ message: 'El nuevo equipo visitante no existe.' });
        }

        const updateData = {
            dateTime,
            homeTeamId,
            homeTeamScore,
            awayTeamId,
            awayTeamScore,
            location,
            matchType,
            status,
            round,
            highlightsUrl,
            liveStreamUrl,
            description,
            order,
            is_active,
            metaTitle,
            metaDescription,
        };

        // Elimina los campos undefined para que Sequelize no intente actualizarlos a nulo
        Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);

        await match.update(updateData);

        // Recarga el objeto para incluir los datos completos de los equipos en la respuesta
        await match.reload({
            include: [
                { model: Team, as: 'homeTeam', attributes: ['id', 'name', 'originalLogoUrl'] }, // ¡CAMBIADO AQUÍ!
                { model: Team, as: 'awayTeam', attributes: ['id', 'name', 'originalLogoUrl'] }, // ¡CAMBIADO AQUÍ!
            ],
        });

        res.status(200).json(match);
    } catch (error) {
        console.error('Error al actualizar partido:', error);
        res.status(500).json({
            message: 'Error interno del servidor al actualizar partido.',
            errorName: error.name,
            errorMessage: error.message,
        });
    }
};

// Borrado suave de un partido (establece is_active en false)
const softDeleteMatch = async (req, res) => {
    try {
        const match = await Match.findByPk(req.params.id);
        if (!match) {
            return res.status(404).json({ message: 'Partido no encontrado.' });
        }
        if (!match.is_active) {
            return res.status(400).json({ message: 'El partido ya está inactivo.' });
        }

        match.is_active = false;
        await match.save();
        res.status(200).json({ message: 'Partido desactivado exitosamente.' });
    } catch (error) {
        console.error('Error al desactivar partido:', error);
        res.status(500).json({
            message: 'Error interno del servidor al desactivar partido.',
            errorName: error.name,
            errorMessage: error.message,
        });
    }
};

module.exports = {
    getAllMatches,
    getMatchById,
    createMatch,
    updateMatch,
    softDeleteMatch,
};