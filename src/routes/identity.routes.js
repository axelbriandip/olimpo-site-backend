// src/routes/identity.routes.js
const express = require('express');
const router = express.Router();
const identityController = require('../controllers/identity.controller');

router.get('/', identityController.getIdentity);
router.put('/', identityController.updateIdentity); // PUT sin ID, ya que actualiza el único registro

module.exports = router;