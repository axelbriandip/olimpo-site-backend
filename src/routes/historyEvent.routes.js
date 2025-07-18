// src/routes/historyEvent.routes.js
const express = require('express');
const router = express.Router();
const historyEventController = require('../controllers/historyEvent.controller');

router.get('/', historyEventController.getAllHistoryEvents);
router.get('/:id', historyEventController.getHistoryEventById);
router.post('/', historyEventController.createHistoryEvent);
router.put('/:id', historyEventController.updateHistoryEvent);
router.put('/delete/:id', historyEventController.softDeleteHistoryEvent); // Siguiendo tu convención de /delete/:id

module.exports = router;