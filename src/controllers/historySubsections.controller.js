// src/controllers/historySubsection.controller.js
// Controlador para las operaciones CRUD de Subsecciones Históricas

const { HistorySubsection, HistoryEvent } = require('../models'); // Importa ambos modelos

// Obtener todas las subsecciones históricas activas
const getAllHistorySubsections = async (req, res) => {
    try {
        const subsections = await HistorySubsection.findAll({
            where: { is_active: true }, // Filtra solo las subsecciones activas
            include: [{
                model: HistoryEvent,
                as: 'historyEvent', // Alias definido en src/models/index.js
                attributes: ['id', 'title', 'year', 'slug'], // Limita los atributos del evento principal
                where: { is_active: true }, // Asegura que solo traes subsecciones de eventos activos
                required: true, // INNER JOIN: solo trae subsecciones si el evento principal existe y está activo
            }],
            order: [
                ['historyEventId', 'ASC'], // Agrupa por evento principal
                ['displayOrder', 'ASC'], // Luego ordena por el orden de visualización
                ['title', 'ASC'] // Finalmente por título alfabéticamente
            ],
        });
        res.status(200).json(subsections);
    } catch (error) {
        console.error('Error al obtener subsecciones históricas:', error);
        res.status(500).json({
            message: 'Error interno del servidor al obtener subsecciones históricas.',
            errorName: error.name,
            errorMessage: error.message,
        });
    }
};

// Obtener una subsección histórica por ID
const getHistorySubsectionById = async (req, res) => {
    try {
        const subsection = await HistorySubsection.findByPk(req.params.id, {
            where: { is_active: true }, // Asegura que solo se obtienen subsecciones activas
            include: [{
                model: HistoryEvent,
                as: 'historyEvent',
                attributes: ['id', 'title', 'year', 'slug'],
                where: { is_active: true },
                required: true,
            }],
        });
        if (!subsection || !subsection.is_active) {
            return res.status(404).json({ message: 'Subsección histórica no encontrada o inactiva.' });
        }
        res.status(200).json(subsection);
    } catch (error) {
        console.error('Error al obtener subsección histórica por ID:', error);
        res.status(500).json({
            message: 'Error interno del servidor al obtener subsección histórica por ID.',
            errorName: error.name,
            errorMessage: error.message,
        });
    }
};

// Crear una nueva subsección histórica
const createHistorySubsection = async (req, res) => {
    const {
        historyEventId,
        title,
        content,
        imageUrl,
        videoUrl,
        displayOrder,
        is_active,
        slug,
        metaTitle,
        metaDescription,
    } = req.body;

    try {
        // Genera el slug automáticamente si no se proporciona
        const finalSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-*|-*$/g, '');

        // Opcional: Verificar si el historyEventId existe y está activo
        const historyEvent = await HistoryEvent.findByPk(historyEventId);
        if (!historyEvent || !historyEvent.is_active) {
            return res.status(400).json({ message: 'El evento histórico principal no existe o está inactivo.' });
        }

        const newSubsection = await HistorySubsection.create({
            historyEventId,
            title,
            content,
            imageUrl,
            videoUrl,
            displayOrder,
            is_active: is_active !== undefined ? is_active : true,
            slug: finalSlug,
            metaTitle,
            metaDescription,
        });
        // Recarga para incluir el evento histórico asociado en la respuesta
        await newSubsection.reload({
            include: [{
                model: HistoryEvent,
                as: 'historyEvent',
                attributes: ['id', 'title', 'year', 'slug']
            }]
        });
        res.status(201).json(newSubsection); // 201 Created
    } catch (error) {
        console.error('Error al crear subsección histórica:', error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ message: 'El slug de la subsección histórica ya existe.', errors: error.errors });
        }
        res.status(500).json({
            message: 'Error interno del servidor al crear subsección histórica.',
            errorName: error.name,
            errorMessage: error.message,
        });
    }
};

// Actualizar una subsección histórica existente
const updateHistorySubsection = async (req, res) => {
    const { id } = req.params;
    const {
        historyEventId,
        title,
        content,
        imageUrl,
        videoUrl,
        displayOrder,
        is_active,
        slug,
        metaTitle,
        metaDescription,
    } = req.body;

    try {
        const subsection = await HistorySubsection.findByPk(id);
        if (!subsection) {
            return res.status(404).json({ message: 'Subsección histórica no encontrada.' });
        }

        // Opcional: Verificar si el nuevo historyEventId existe y está activo, si se cambia
        if (historyEventId && historyEventId !== subsection.historyEventId) {
            const historyEvent = await HistoryEvent.findByPk(historyEventId);
            if (!historyEvent || !historyEvent.is_active) {
                return res.status(400).json({ message: 'El nuevo evento histórico principal no existe o está inactivo.' });
            }
        }

        const updateData = {
            historyEventId,
            title,
            content,
            imageUrl,
            videoUrl,
            displayOrder,
            is_active,
            slug,
            metaTitle,
            metaDescription,
        };

        // Elimina los campos undefined para que Sequelize no intente actualizarlos a nulo
        Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);

        await subsection.update(updateData);
        // Recarga para incluir el evento histórico asociado en la respuesta
        await subsection.reload({
            include: [{
                model: HistoryEvent,
                as: 'historyEvent',
                attributes: ['id', 'title', 'year', 'slug']
            }]
        });
        res.status(200).json(subsection);
    } catch (error) {
        console.error('Error al actualizar subsección histórica:', error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ message: 'El slug de la subsección histórica ya existe.', errors: error.errors });
        }
        res.status(500).json({
            message: 'Error interno del servidor al actualizar subsección histórica.',
            errorName: error.name,
            errorMessage: error.message,
        });
    }
};

// Borrado suave de una subsección histórica (establece is_active en false)
const softDeleteHistorySubsection = async (req, res) => {
    try {
        const subsection = await HistorySubsection.findByPk(req.params.id);
        if (!subsection) {
            return res.status(404).json({ message: 'Subsección histórica no encontrada.' });
        }
        if (!subsection.is_active) {
            return res.status(400).json({ message: 'La subsección histórica ya está inactiva.' });
        }

        subsection.is_active = false;
        await subsection.save();
        res.status(200).json({ message: 'Subsección histórica desactivada exitosamente.' });
    } catch (error) {
        console.error('Error al desactivar subsección histórica:', error);
        res.status(500).json({
            message: 'Error interno del servidor al desactivar subsección histórica.',
            errorName: error.name,
            errorMessage: error.message,
        });
    }
};

module.exports = {
    getAllHistorySubsections,
    getHistorySubsectionById,
    createHistorySubsection,
    updateHistorySubsection,
    softDeleteHistorySubsection,
};