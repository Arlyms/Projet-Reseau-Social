const express = require('express');
const ControllerUsers = require('../controllers/controller-users');
const password = require('../middleware/password');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config-user');


router.post('/signup', password, ControllerUsers.addUser); 
router.post('/login', ControllerUsers.login);
router.post('/', auth, multer, ControllerUsers.addPp);
router.get('/', auth, ControllerUsers.showUser);
router.delete('/:id', auth, ControllerUsers.deleteUser);

module.exports = router; 