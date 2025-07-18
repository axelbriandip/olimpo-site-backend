// src/routes/testimonial.routes.js
const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/testimonial.controller');

router.get('/', testimonialController.getAllTestimonials);
router.get('/:id', testimonialController.getTestimonialById);
router.post('/', testimonialController.createTestimonial);
router.put('/:id', testimonialController.updateTestimonial);
router.put('/delete/:id', testimonialController.softDeleteTestimonial);

module.exports = router;