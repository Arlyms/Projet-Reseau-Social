const express = require('express');
const ControllerPosts = require('../controllers/controller-posts');
const router = express.Router();

router.post('/', ControllerPosts.addPost); 
router.get('/', ControllerPosts.findAllPost);
router.put('/', ControllerPosts.updatePost);
router.delete('/', ControllerPosts.deletePost);
router.get('/comments', ControllerPosts.findAllComment); // recuperation des posts
router.put('/comments', ControllerPosts.updateComment);
router.delete('/comments', ControllerPosts.deleteComment);


module.exports = router;