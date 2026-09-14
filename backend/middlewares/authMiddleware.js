const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

const isAuthenticated = async (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (!token || !token.startsWith('Bearer')) {
            return res.status(401).json({ message: 'Unauthorized', error: 'No token provided' });
        }

        token = token.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized', error: 'Invalid token' });
    }
};


module.exports = { isAuthenticated };