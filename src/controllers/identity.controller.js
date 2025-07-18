// src/controllers/identity.controller.js
const { Identity } = require('../models');

// Obtener la única configuración de identidad
const getIdentity = async (req, res) => {
    try {
        // Asume que solo habrá un registro de identidad, o el primero activo
        const identity = await Identity.findOne({
            where: { is_active: true },
        });

        if (!identity) {
            // Si no hay ningún registro, puedes devolver un 404 o un objeto vacío
            return res.status(404).json({ message: 'Identity configuration not found. Please create one.' });
        }
        res.json(identity);
    } catch (error) {
        console.error('Error retrieving identity configuration:', error);
        res.status(500).json({ message: 'Error retrieving identity configuration', error: error.message });
    }
};

// Actualizar la configuración de identidad existente
const updateIdentity = async (req, res) => {
    try {
        // Busca el único registro activo de identidad
        let identity = await Identity.findOne({
            where: { is_active: true },
        });

        if (!identity) {
            // Si no existe, lo crea. Esto podría ser un "upsert" o un "create if not exists"
            identity = await Identity.create(req.body);
            return res.status(201).json(identity);
        }

        // Si existe, lo actualiza
        await identity.update(req.body);
        res.json(identity);
    } catch (error) {
        console.error('Error updating identity configuration:', error);
        res.status(500).json({ message: 'Error updating identity configuration', error: error.message });
    }
};

module.exports = {
    getIdentity,
    updateIdentity,
};