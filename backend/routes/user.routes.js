const express = require('express');
const ControllerUsers = require('../controllers/controller-users');
const password = require('../middleware/password');
const router = express.Router();
const auth = require('../middleware/auth');


router.post('/signup', password, ControllerUsers.addUser); 
router.post('/login', ControllerUsers.login);
router.get('/', auth, ControllerUsers.showUser);
router.delete('/', ControllerUsers.deleteUser);

module.exports = router;