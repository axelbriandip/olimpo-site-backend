// src/controllers/identity.controller.js
const { Identity } = require('../models');

// Obtener la identidad institucional (normalmente solo habrá un registro)
const getIdentity = async (req, res) => {
    try {
        const identity = await Identity.findOne({
            where: { is_active: true }
        });

        if (!identity) {
            return res.status(404).json({ message: 'Identidad institucional no encontrada o inactiva.' });
        }
        res.status(200).json(identity);
    } catch (error) {
        console.error('Error al obtener la identidad institucional:', error);
        res.status(500).json({
            message: 'Error interno del servidor al obtener la identidad institucional.',
            errorName: error.name,
            errorMessage: error.message,
        });
    }
};

// Crear la identidad institucional
const createIdentity = async (req, res) => {
    const {
        missionText,
        missionImageUrl,
        visionText,
        visionImageUrl,
        valuesText,
        valuesImageUrl,
        is_active,
    } = req.body;

    try {
        const existingIdentity = await Identity.findOne({ where: { is_active: true } });
        if (existingIdentity) {
            return res.status(409).json({ message: 'Ya existe un registro de identidad institucional activo. Por favor, actualícelo en su lugar.' });
        }

        const newIdentity = await Identity.create({
            missionText,
            missionImageUrl,
            visionText,
            visionImageUrl,
            valuesText,
            valuesImageUrl,
            is_active: is_active !== undefined ? is_active : true,
        });
        res.status(201).json(newIdentity);
    } catch (error) {
        console.error('Error al crear la identidad institucional:', error);
        res.status(500).json({
            message: 'Error interno del servidor al crear la identidad institucional.',
            errorName: error.name,
            errorMessage: error.message,
        });
    }
};

// Actualizar la identidad institucional existente
const updateIdentity = async (req, res) => {
    const { id } = req.params; // <--- OBTENEMOS EL ID DE LOS PARÁMETROS DE LA RUTA
    const {
        missionText,
        missionImageUrl,
        visionText,
        visionImageUrl,
        valuesText,
        valuesImageUrl,
        is_active,
    } = req.body;

    try {
        const [updatedRows] = await Identity.update({
            missionText,
            missionImageUrl,
            visionText,
            visionImageUrl,
            valuesText,
            valuesImageUrl,
            is_active,
        }, {
            where: { id: id } // <--- USAMOS EL ID PARA LA ACTUALIZACIÓN
        });

        if (updatedRows === 0) {
            return res.status(404).json({ message: 'Identidad institucional no encontrada para actualizar.' });
        }

        const updatedIdentity = await Identity.findByPk(id); // Obtenemos el registro actualizado
        res.status(200).json(updatedIdentity);
    } catch (error) {
        console.error('Error al actualizar la identidad institucional:', error);
        res.status(500).json({
            message: 'Error interno del servidor al actualizar la identidad institucional.',
            errorName: error.name,
            errorMessage: error.message,
        });
    }
};

// Borrado suave de la identidad institucional (establece is_active en false)
const softDeleteIdentity = async (req, res) => {
    const { id } = req.params; // <--- OBTENEMOS EL ID DE LOS PARÁMETROS DE LA RUTA
    try {
        const [updatedRows] = await Identity.update(
            { is_active: false },
            { where: { id: id, is_active: true } } // <--- USAMOS EL ID PARA LA DESACTIVACIÓN
        );

        if (updatedRows === 0) {
            return res.status(404).json({ message: 'Identidad institucional no encontrada o ya está inactiva.' });
        }

        res.status(200).json({ message: 'Identidad institucional desactivada exitosamente.' });
    } catch (error) {
        console.error('Error al desactivar la identidad institucional:', error);
        res.status(500).json({
            message: 'Error interno del servidor al desactivar la identidad institucional.',
            errorName: error.name,
            errorMessage: error.message,
        });
    }
};

module.exports = {
    getIdentity,
    createIdentity,
    updateIdentity,
    softDeleteIdentity,
};
