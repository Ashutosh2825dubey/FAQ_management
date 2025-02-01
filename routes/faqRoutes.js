// routes/faqRoutes.js
const express = require('express');
const router = express.Router();
const faqController = require('../controllers/faqcontroller');


router.get('/', faqController.getFAQs);

module.exports = router;
