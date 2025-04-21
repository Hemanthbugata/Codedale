const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config');
// const { JWT_SECRET } = process.env;
require('dotenv').config();

const auth = async (req, res, next) => {
    const token = req.headers.authorization;  
    if (!token) {
        return res.status(401).json({ error: 'Authorization token is missing' });
    }

    const words = token.split(" ");  
    const jwtToken = words[1];

    try {
        const decodedValue = jwt.verify(jwtToken, JWT_SECRET);  
        req.user = decodedValue;  
        next();  
    } catch (error) {
        res.status(401).json({ error: 'Invalid or expired token' });  
    }
};

const admin = async (req, res, next) => {
  if ( req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Not authorized as an admin' });
  }
  next();
};

module.exports = { auth, admin };
