//Importing required modules

const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');
const helmet = require('helmet');
const cookieParser = require('cookie-parser'); 
const methodOverride = require('method-override');
dotenv.config();

const connectDB = require('./config/db');
const adminRoutes = require('./routes/faqAdminRoutes'); 
const faqRoutes = require('./routes/faqRoutes');    

const app = express();

// db connection
connectDB();
//middlewares
app.use(helmet()); 
app.use(cookieParser()); 
app.use(express.static(path.join(__dirname, 'public'))); 
app.use(morgan('dev')); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(methodOverride('_method'));
//setting the views to ejs 
app.set('view engine', 'ejs');

// Routes
app.use('/api/faqs', faqRoutes);         
app.use('/admin', adminRoutes);         


// 404 or error middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
