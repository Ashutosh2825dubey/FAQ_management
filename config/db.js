// config/db.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
// Using async/await to handle the promise returned by mongoose.connect
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
