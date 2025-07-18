// src/routes/testimonial.routes.js
const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/testimonial.controller');
const verifyToken = require('../middlewares/auth.middleware');

router.get('/', testimonialController.getAllTestimonials);
router.get('/:id', testimonialController.getTestimonialById);

router.post('/', verifyToken, testimonialController.createTestimonial);
router.put('/:id', verifyToken, testimonialController.updateTestimonial);
router.put('/delete/:id', verifyToken, testimonialController.softDeleteTestimonial);

module.exports = router;