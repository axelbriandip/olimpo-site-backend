// src/controllers/historyEvent.controller.js
// Controlador para las operaciones CRUD de Eventos Históricos

const { HistoryEvent, HistorySubsection } = require('../models'); // Importa ambos modelos aquí

// Obtener todos los eventos históricos activos incluyendo sus subsecciones
const getAllHistoryEvents = async (req, res) => {
    try {
        const events = await HistoryEvent.findAll({
            where: { is_active: true }, // Filtra solo los eventos activos
            include: [{
                model: HistorySubsection,
                as: 'subsections', // Alias definido en src/models/index.js
                where: { is_active: true }, // Opcional: solo incluir subsecciones activas
                required: false, // Usar FALSE para LEFT JOIN, así trae eventos aunque no tengan subsecciones
                // Puedes limitar los atributos de las subsecciones si no necesitas todos
                attributes: ['id', 'title', 'content', 'imageUrl', 'displayOrder']
            }],
            order: [
                ['year', 'ASC'], // Cambiado a ascendente para línea de tiempo
                ['month', 'ASC'], // Luego por mes ascendente
                ['day', 'ASC'], // Finalmente por día ascendente
                ['displayOrder', 'ASC'], // Y por displayOrder ascendente
                // También puedes ordenar las subsecciones dentro de cada evento
                [{ model: HistorySubsection, as: 'subsections' }, 'displayOrder', 'ASC'] // Ordenar las subsecciones por su displayOrder
            ],
        });
        res.status(200).json(events);
    } catch (error) {
        console.error('Error al obtener eventos históricos:', error);
        res.status(500).json({
            message: 'Error interno del servidor al obtener eventos históricos.',
            errorName: error.name,
            errorMessage: error.message,
        });
    }
};

// Obtener un evento histórico por ID
const getHistoryEventById = async (req, res) => {
    try {
        const event = await HistoryEvent.findByPk(req.params.id, {
            where: { is_active: true }, // Asegura que solo se obtienen eventos activos
            include: [{ // Incluir subsecciones también para el detalle por ID
                model: HistorySubsection,
                as: 'subsections',
                where: { is_active: true },
                required: false,
                attributes: ['id', 'title', 'content', 'imageUrl', 'displayOrder']
            }]
        });
        if (!event || !event.is_active) {
            return res.status(404).json({ message: 'Evento histórico no encontrado o inactivo.' });
        }
        res.status(200).json(event);
    } catch (error) {
        console.error('Error al obtener evento histórico por ID:', error);
        res.status(500).json({
            message: 'Error interno del servidor al obtener evento histórico por ID.',
            errorName: error.name,
            errorMessage: error.message,
        });
    }
};

// Crear un nuevo evento histórico
const createHistoryEvent = async (req, res) => {
    // Desestructura solo los campos que el modelo HistoryEvent ahora acepta
    const {
        title,
        year,
        month,
        day,
        description,
        imageUrl,
        slug,
        is_active,
        displayOrder,
        metaTitle,
        metaDescription,
    } = req.body;

    try {
        // Genera el slug automáticamente si no se proporciona
        const finalSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-*|-*$/g, '');

        const newEvent = await HistoryEvent.create({
            title,
            year,
            month,
            day,
            description,
            imageUrl,
            slug: finalSlug,
            is_active: is_active !== undefined ? is_active : true, // Permite especificar is_active, por defecto true
            displayOrder,
            metaTitle,
            metaDescription,
        });
        res.status(201).json(newEvent); // 201 Created
    } catch (error) {
        console.error('Error al crear evento histórico:', error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ message: 'El título o el slug del evento histórico ya existe.', errors: error.errors });
        }
        res.status(500).json({
            message: 'Error interno del servidor al crear evento histórico.',
            errorName: error.name,
            errorMessage: error.message,
        });
    }
};

// Actualizar un evento histórico existente
const updateHistoryEvent = async (req, res) => {
    const { id } = req.params;
    const {
        title,
        year,
        month,
        day,
        description,
        imageUrl,
        slug,
        is_active,
        displayOrder,
        metaTitle,
        metaDescription,
    } = req.body;

    try {
        const event = await HistoryEvent.findByPk(id);
        if (!event) {
            return res.status(404).json({ message: 'Evento histórico no encontrado.' });
        }

        // Prepara el objeto con los campos a actualizar
        const updateData = {
            title,
            year,
            month,
            day,
            description,
            imageUrl,
            slug,
            is_active,
            displayOrder,
            metaTitle,
            metaDescription,
        };

        // Elimina los campos undefined para que Sequelize no intente actualizarlos a nulo
        Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);

        await event.update(updateData);
        res.status(200).json(event);
    } catch (error) {
        console.error('Error al actualizar evento histórico:', error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ message: 'El título o el slug del evento histórico ya existe.', errors: error.errors });
        }
        res.status(500).json({
            message: 'Error interno del servidor al actualizar evento histórico.',
            errorName: error.name,
            errorMessage: error.message,
        });
    }
};

// Borrado suave de un evento histórico (establece is_active en false)
const softDeleteHistoryEvent = async (req, res) => {
    try {
        const event = await HistoryEvent.findByPk(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Evento histórico no encontrado.' });
        }
        if (!event.is_active) {
            return res.status(400).json({ message: 'El evento histórico ya está inactivo.' });
        }

        event.is_active = false;
        await event.save();
        res.status(200).json({ message: 'Evento histórico desactivado exitosamente.' });
    } catch (error) {
        console.error('Error al desactivar evento histórico:', error);
        res.status(500).json({
            message: 'Error interno del servidor al desactivar evento histórico.',
            errorName: error.name,
            errorMessage: error.message,
        });
    }
};

module.exports = {
    getAllHistoryEvents,
    getHistoryEventById,
    createHistoryEvent,
    updateHistoryEvent,
    softDeleteHistoryEvent,
};