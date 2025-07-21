// src/controllers/identity.controller.js
// Controlador para las operaciones CRUD de la Identidad Institucional del Club

const { Identity } = require('../models'); // Importa el modelo Identity

// Obtener la identidad institucional (normalmente solo habrá un registro)
const getIdentity = async (req, res) => {
    try {
        // Busca el primer registro activo de identidad.
        // Asume que solo habrá un registro en la tabla para la identidad del club.
        const identity = await Identity.findOne({
            where: { is_active: true },
        });

        if (!identity) {
            // Si no hay un registro activo, devuelve 404
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
// Esta función está diseñada para ser llamada una sola vez para crear el registro inicial.
// Si ya existe un registro activo, se debería usar updateIdentity en su lugar.
const createIdentity = async (req, res) => {
    // Desestructura solo los campos que son NOT NULL en el modelo final, más los opcionales.
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
        // Opcional: Verificar si ya existe un registro activo para evitar duplicados
        const existingIdentity = await Identity.findOne({ where: { is_active: true } });
        if (existingIdentity) {
            return res.status(409).json({ message: 'Ya existe un registro de identidad institucional activo. Por favor, actualícelo en su lugar.' });
        }

        // Crea el nuevo registro con los campos permitidos por el modelo final
        const newIdentity = await Identity.create({
            missionText,
            missionImageUrl,
            visionText,
            visionImageUrl,
            valuesText,
            valuesImageUrl,
            is_active: is_active !== undefined ? is_active : true, // Permite especificar is_active, por defecto true
        });
        res.status(201).json(newIdentity); // 201 Created
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
    // Desestructura SOLO los campos que se han definido como modificables en la última revisión del modelo.
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
        // Busca el registro de identidad (el único activo)
        const identity = await Identity.findOne();

        if (!identity) {
            return res.status(404).json({ message: 'Identidad institucional no encontrada para actualizar.' });
        }

        // Prepara el objeto con los campos a actualizar
        const updateData = {
            missionText,
            missionImageUrl,
            visionText,
            visionImageUrl,
            valuesText,
            valuesImageUrl,
            is_active,
        };

        // Elimina los campos undefined para que Sequelize no intente actualizarlos a nulo si no se proporcionan
        Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);

        await identity.update(updateData);
        res.status(200).json(identity);
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
// Útil si se quiere "ocultar" la sección de identidad sin borrarla.
const softDeleteIdentity = async (req, res) => {
    try {
        // Busca el registro de identidad (el único activo)
        const identity = await Identity.findOne();

        if (!identity) {
            return res.status(404).json({ message: 'Identidad institucional no encontrada.' });
        }
        if (!identity.is_active) {
            return res.status(400).json({ message: 'La identidad institucional ya está inactiva.' });
        }

        identity.is_active = false;
        await identity.save();
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