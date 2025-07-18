const express = require('express');
const router = express.Router();
const matchController = require('../controllers/match.controller');
const verifyToken = require('../middlewares/auth.middleware');

// publics
router.get('/', matchController.getAllMatches);
router.get('/:id', matchController.getMatchById);

// protecteds
router.post('/', verifyToken, matchController.createMatch);
router.put('/:id', verifyToken, matchController.updateMatch);
router.put('delete//:id', verifyToken, matchController.deleteMatch);

module.exports = router;
