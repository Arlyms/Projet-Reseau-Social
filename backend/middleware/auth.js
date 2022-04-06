// Authentification du token

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1]; 
      console.log(token);
      const decodedToken = jwt.verify(token, 'SECRET_KEY');
      const userId = decodedToken.userId;
      const admin = decodedToken.admin;
      console.log(decodedToken);
      req.auth = { userId , admin };
      if (req.body.userId && req.body.userId !== userId) {
        throw 'Invalid user ID';
      } else {
        next();
      }
    } catch {
      res.status(401).json({
        error: new Error('Invalid request!')
      });
    }
};