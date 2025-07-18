const express = require('express');
const router = express.Router();
const playerController = require('../controllers/player.controller');
const verifyToken = require('../middlewares/auth.middleware');

router.get('/', playerController.getAllPlayers);
router.get('/:id', playerController.getPlayerById);

router.post('/', verifyToken, playerController.createPlayer);
router.put('/:id', verifyToken, playerController.updatePlayer);
router.put('/delete/:id', verifyToken, playerController.softDeletePlayer);

module.exports = router;