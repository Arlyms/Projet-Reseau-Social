const express = require('express');
const ControllerPosts = require('../controllers/controller-posts');
const auth = require('../middleware/auth')
const router = express.Router();

//posts
router.post('/', auth, ControllerPosts.addPost); 
router.get('/', auth, ControllerPosts.findAllPost);
router.put('/:id', auth, ControllerPosts.updatePost);
router.delete('/:id', auth, ControllerPosts.deletePost);

//comments
router.post('/:id/comments', auth, ControllerPosts.addComment);
router.get('/:id/comments', auth, ControllerPosts.findByPost);
router.put('/comments/:id', auth, ControllerPosts.updateComment);
router.delete('/comments/:id', auth, ControllerPosts.deleteComment);


module.exports = router;