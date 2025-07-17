const express = require('express');
const router = express.Router();
const playerController = require('../controllers/player.controller');

router.get('/', playerController.getAllPlayers);
router.post('/', playerController.createPlayer);
router.delete('/:id', playerController.deletePlayer);

module.exports = router;