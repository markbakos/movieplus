const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if(!token){
        return res.status(401).json({message: 'Access denied: no token provided'});
    }

    try{
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    }
    catch (e) {
        return res.status(403).json({message: 'Access denied: invalid token'});
    }
};

module.exports = authenticateToken;