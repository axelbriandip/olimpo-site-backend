// src/controllers/historyEvent.controller.js
const { HistoryEvent, HistorySubsection } = require('../models'); // Importa ambos modelos

const getAllHistoryEvents = async (req, res) => {
    try {
        const events = await HistoryEvent.findAll({
            where: { is_active: true },
            // ¡Aquí es donde incluimos las subsecciones!
            include: [{
                model: HistorySubsection,
                as: 'subsections', // Usa el alias definido en la asociación
                where: { is_active: true }, // Asegura que solo traes subsecciones activas
                required: false, // Usamos false para un LEFT JOIN, así traemos eventos sin subsecciones
                attributes: ['title', 'text', 'img'], // Puedes limitar los atributos que traes
            }],
            order: [
                ['createdAt', 'ASC'], // O por 'dateText' si parseas las fechas para ordenar
                [{ model: HistorySubsection, as: 'subsections' }, 'createdAt', 'ASC'] // Ordena subsecciones
            ],
        });
        res.json(events);
    } catch (error) {
        console.error('Error retrieving history events:', error);
        res.status(500).json({ message: 'Error retrieving history events', error: error.message });
    }
};

const getHistoryEventById = async (req, res) => {
    try {
        const event = await HistoryEvent.findByPk(req.params.id, {
            where: { is_active: true },
            include: [{
                model: HistorySubsection,
                as: 'subsections',
                where: { is_active: true },
                required: false,
                attributes: ['title', 'text', 'img'],
            }],
        });
        if (!event || !event.is_active) {
            return res.status(404).json({ message: 'History event not found' });
        }
        res.json(event);
    } catch (error) {
        console.error('Error retrieving history event by ID:', error);
        res.status(500).json({ message: 'Error retrieving history event', error: error.message });
    }
};

const createHistoryEvent = async (req, res) => {
    const { title, dateText, description, subsections } = req.body;
    try {
        const newEvent = await HistoryEvent.create({ title, dateText, description });

        if (subsections && subsections.length > 0) {
            // Asigna el ID del evento recién creado a cada subsección
            const subsectionsWithEventId = subsections.map(sub => ({
                ...sub,
                historyEventId: newEvent.id // Clave foránea
            }));
            await HistorySubsection.bulkCreate(subsectionsWithEventId);
            // Vuelve a cargar el evento con las subsecciones para la respuesta
            await newEvent.reload({
                include: [{
                    model: HistorySubsection,
                    as: 'subsections',
                    attributes: ['title', 'text', 'img']
                }]
            });
        }
        res.status(201).json(newEvent);
    } catch (error) {
        console.error('Error creating history event:', error);
        res.status(500).json({ message: 'Error creating history event', error: error.message });
    }
};

const updateHistoryEvent = async (req, res) => {
    const { id } = req.params;
    const { title, dateText, description, subsections } = req.body;
    try {
        const event = await HistoryEvent.findByPk(id, {
            where: { is_active: true },
            include: [{ model: HistorySubsection, as: 'subsections' }]
        });

        if (!event || !event.is_active) {
            return res.status(404).json({ message: 'History event not found' });
        }

        await event.update({ title, dateText, description });

        // Lógica para actualizar las subsecciones
        if (subsections !== undefined) { // Permite borrar todas si subsections es []
            // Primero, eliminamos las subsecciones existentes (o las marcamos como inactivas)
            // Para simplificar, vamos a borrarlas y recrearlas, pero podrías hacer un update más inteligente.
            await HistorySubsection.destroy({
                where: { historyEventId: event.id }
            });

            if (subsections.length > 0) {
                const subsectionsToCreate = subsections.map(sub => ({
                    ...sub,
                    historyEventId: event.id
                }));
                await HistorySubsection.bulkCreate(subsectionsToCreate);
            }
            // Vuelve a cargar el evento con las subsecciones actualizadas
            await event.reload({
                include: [{
                    model: HistorySubsection,
                    as: 'subsections',
                    attributes: ['title', 'text', 'img']
                }]
            });
        }
        res.json(event);
    } catch (error) {
        console.error('Error updating history event:', error);
        res.status(500).json({ message: 'Error updating history event', error: error.message });
    }
};

const softDeleteHistoryEvent = async (req, res) => {
    try {
        const event = await HistoryEvent.findByPk(req.params.id);
        if (!event || !event.is_active) {
            return res.status(404).json({ message: 'History event not found' });
        }
        event.is_active = false;
        await event.save();

        // Opcional: También desactivar todas las subsecciones asociadas
        await HistorySubsection.update(
            { is_active: false },
            { where: { historyEventId: event.id } }
        );

        res.json({ message: 'History event deactivated successfully' });
    } catch (error) {
        console.error('Error deactivating history event:', error);
        res.status(500).json({ message: 'Error deactivating history event', error: error.message });
    }
};

module.exports = {
    getAllHistoryEvents,
    getHistoryEventById,
    createHistoryEvent,
    updateHistoryEvent,
    softDeleteHistoryEvent,
};