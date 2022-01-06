const express = require('express');
const ControllerUsers = require('../controllers/controller-users');
const password = require('../middleware/password');
const router = express.Router();


router.post('/signup', password, ControllerUsers.addUser);
router.post('/login', ControllerUsers.login);
router.get('/:id', ControllerUsers.showUser);
router.put('/:id', ControllerUsers.updateUser);
router.delete('/:id', ControllerUsers.deleteUser);

module.exports = router;