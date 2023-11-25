const jwt = require('jsonwebtoken');
const config = require('../config').config();

const authorization = (req, res, next) => {
    const token = req.headers['x-access-token'];

    console.log("token:", token);

    console.log(req.headers);
    if (!token) {
        
        
        return res.status(401).json({ auth: false, message: 'No token provided.' });
    }

    const secret = process.env.SECRET;
    console.log("secret",secret)
    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ auth: false, message: 'Failed to authenticate token.' });
        }

        req.userId = decoded.id;
        next();
    });
};

module.exports = authorization;