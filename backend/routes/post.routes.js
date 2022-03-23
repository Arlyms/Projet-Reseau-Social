const express = require('express');
const router = express.Router();

const ControllerPosts = require('../controllers/controller-posts');
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')


//posts
router.post('/', auth, multer, ControllerPosts.addPost); 
router.get('/', auth, ControllerPosts.findAllPost);
router.delete('/:id', auth, ControllerPosts.deletePost);

//comments
router.post('/comments', auth, ControllerPosts.addComment);
router.get('/:id/comments', auth, ControllerPosts.findByPost);
router.delete('/comments/:id', auth, ControllerPosts.deleteComment);


module.exports = router;