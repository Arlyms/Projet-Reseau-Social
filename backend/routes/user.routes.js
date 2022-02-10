const express = require('express');
const ControllerUsers = require('../controllers/controller-users');
const password = require('../middleware/password');
const router = express.Router();
const auth = require('../middleware/auth');


router.post('/signup', password, ControllerUsers.addUser); 
router.post('/login', ControllerUsers.login);
router.get('/', auth, ControllerUsers.showUser, ControllerUsers.validatetoken);
router.put('/:id', auth, ControllerUsers.updateUser);
router.delete('/:id', auth, ControllerUsers.deleteUser);

module.exports = router;