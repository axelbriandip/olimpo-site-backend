const express = require('express');
const router = express.Router();
const playerController = require('../controllers/player.controller');

router.get('/', playerController.getAllPlayers);
router.get('/:id', playerController.getPlayerById);
router.post('/', playerController.createPlayer);
router.put('/:id', playerController.updatePlayer);
router.put('/delete/:id', playerController.softDeletePlayer);

module.exports = router;
