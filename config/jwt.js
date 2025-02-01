const jwt = require('jsonwebtoken');

// Secret key for JWT token
const JWT_SECRET = process.env.JWT_SECRET

// Generate JWT Token
const maxAge=3*24*60*60;
const generateToken = (adminId) => {
  return jwt.sign({ adminId }, JWT_SECRET, { expiresIn: maxAge });
};

// Middleware to verify JWT Token
const verifyAdmin = (req, res, next) => {
  // Extract token from cookies to validate user
  const token = req.cookies.token; 

  if (!token) {
    return res.status(403).json({ error: 'No token provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    req.adminId = decoded.adminId; 
    next();
  });
};

module.exports = { generateToken, verifyAdmin };
