const { generateToken } = require('../config/jwt');
const FAQ = require('../models/faq');
const redisClient = require('../config/redis');
const { translateText } = require('../config/translator');

const supportedLanguages = ['hi', 'bn']; //current langauges supported for translation

// admin credientials
const adminCredentials = {
  username: 'admin',
  password: 'admin' 
};

// Admin login to get the JWT token and store it in a cookie
const loginAdmin = (req, res) => {
  const { username, password } = req.body;

  if (username === adminCredentials.username && password === adminCredentials.password) {
    const token = generateToken(adminCredentials.username);

    // Store the token in a cookie 
    res.cookie('token', token, { 
      httpOnly: true, 
      maxAge:3*24*60*60 //expires in 3day
    });

    console.log('Admin logged in successfully');
    return res.redirect('/admin/dashboard');
  }

  console.log('Invalid login attempt');
  res.status(401).json({ error: 'Invalid login credentials' });
};

// Admin dashboard page 
const adminDashboard = async (req, res) => {
  try {
    const faqs = await FAQ.find({});
    res.render('adminDashboard', { faqs }); // Render the admin dashboard page with FAQs
  } catch (error) {
    console.error('Error fetching FAQs:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Create a new FAQ with translations generated on the fly
const createFAQ = async (req, res) => {
  try {
    const { question, answer } = req.body;
    if (!question || !answer) {
      return res.status(400).json({ error: 'Question and answer are required.' });
    }

    // Prepare translations for supported languages
    const translations = {};
    for (const lang of supportedLanguages) {
      const translatedQuestion = await translateText(question, lang);
      const translatedAnswer = await translateText(answer, lang);
      translations[lang] = {
        question: translatedQuestion,
        answer: translatedAnswer
      };
    }

    // Create and save the FAQ document with translations
    const faq = new FAQ({ question, answer, translations });//using faq schema from models folder
    await faq.save();
    console.log(`FAQ created and saved in MongoDB: ${faq._id}`);

    // Invalidate cached FAQ lists 
    const cacheLangs = [process.env.DEFAULT_LANG, ...supportedLanguages];
    for (const lang of cacheLangs) {
      const key = `faqs_${lang || 'en'}`;
      await redisClient.del(key);
      console.log(`Invalidated Redis cache: ${key}`);
    }

    // Redirect to admin dashboard after creating the FAQ
    res.redirect('/admin/dashboard');
  } catch (error) {
    console.error('Error in createFAQ:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};



// Delete an FAQ
const deleteFAQ = async (req, res) => {
  const { id } = req.params;

  try {
    const faq = await FAQ.findByIdAndDelete(id);
    if (!faq) return res.status(404).json({ error: 'FAQ not found' });

    res.redirect('/admin/dashboard');
  } catch (error) {
    console.error('Error deleting FAQ:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};
const logout_get=(req,res)=>{
    res.cookie('token','',{maxAge:1});
    res.redirect('/admin/login');
}

module.exports = { loginAdmin, adminDashboard, createFAQ, deleteFAQ,logout_get };
