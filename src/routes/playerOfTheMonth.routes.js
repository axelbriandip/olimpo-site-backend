// src/routes/playerOfTheMonth.routes.js
const express = require('express');
const router = express.Router();
const playerOfTheMonthController = require('../controllers/playerOfTheMonth.controller');

router.get('/', playerOfTheMonthController.getAllPlayersOfTheMonth);
router.get('/:id', playerOfTheMonthController.getPlayerOfTheMonthById);
router.post('/', playerOfTheMonthController.createPlayerOfTheMonth);
router.put('/:id', playerOfTheMonthController.updatePlayerOfTheMonth);
router.put('/delete/:id', playerOfTheMonthController.softDeletePlayerOfTheMonth);

module.exports = router;