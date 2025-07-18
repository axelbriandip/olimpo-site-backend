// src/routes/playerOfTheMonth.routes.js
const express = require('express');
const router = express.Router();
const playerOfTheMonthController = require('../controllers/playerOfTheMonth.controller');
const verifyToken = require('../middlewares/auth.middleware');

router.get('/', playerOfTheMonthController.getAllPlayersOfTheMonth);
router.get('/:id', playerOfTheMonthController.getPlayerOfTheMonthById);

router.post('/', verifyToken, playerOfTheMonthController.createPlayerOfTheMonth);
router.put('/:id', verifyToken, playerOfTheMonthController.updatePlayerOfTheMonth);
router.put('/delete/:id', verifyToken, playerOfTheMonthController.softDeletePlayerOfTheMonth);

module.exports = router;