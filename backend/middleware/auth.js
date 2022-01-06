const jwt = require('jsonwebtoken');
const ControllerUsers = require('../controllers/controller-users');

// Authentification du token 
module.exports = (req, res, next) => {
  ControllerUsers.validatetoken( req, res, next);
};