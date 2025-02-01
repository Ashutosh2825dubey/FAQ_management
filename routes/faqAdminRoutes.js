const express = require('express');
const { loginAdmin, adminDashboard, createFAQ,  deleteFAQ ,logout_get} = require('../controllers/faqAdmincontroller');
const { verifyAdmin } = require('../config/jwt');
const router = express.Router();

//login form
router.get('/login', (req, res) => {
  res.render('adminLogin'); // Render login page
});

//login logic
router.post('/login', loginAdmin);

//dashboard
router.get('/dashboard', verifyAdmin, adminDashboard);

// creating new FAQS
router.post('/create-faq', verifyAdmin, createFAQ);



// Delete FAQ - Protected route
router.delete('/delete-faq/:id', verifyAdmin, deleteFAQ);
router.get('/logout',logout_get);
module.exports = router;
