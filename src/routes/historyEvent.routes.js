// src/routes/historyEvent.routes.js
const express = require('express');
const router = express.Router();
const historyEventController = require('../controllers/historyEvent.controller');
const verifyToken = require('../middlewares/auth.middleware');

// publics
router.get('/', historyEventController.getAllHistoryEvents);
router.get('/:id', historyEventController.getHistoryEventById);

// protecteds
router.post('/', verifyToken, historyEventController.createHistoryEvent);
router.put('/:id', verifyToken, historyEventController.updateHistoryEvent);
router.put('/delete/:id', verifyToken, historyEventController.softDeleteHistoryEvent); // Siguiendo tu convención de /delete/:id

module.exports = router;