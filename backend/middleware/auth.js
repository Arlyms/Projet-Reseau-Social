const jwt = require('jsonwebtoken');

// Authentification du token 
module.exports = (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1]; // récupération du token 
      console.log(token);
      const decodedToken = jwt.verify(token, 'SECRET_KEY');
      const userId = decodedToken.userId;
      console.log(decodedToken);
      req.auth = { userId };
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