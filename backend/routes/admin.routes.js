const express = require('express');
const router = express.Router();

const ControllerAdmin = require('../controllers/controller-admin');
const auth = require('../middleware/auth');

router.get('/', auth, ControllerAdmin.findAllPost);
router.get('/:id/comments', auth, ControllerAdmin.findByPost);
router.delete('/:id', auth, ControllerAdmin.deletePost);
router.delete('/comments/:id', auth, ControllerAdmin.deleteComment);

module.exports = router;