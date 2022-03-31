const Posts = require("../dao/dao-posts");
const fs = require ("fs");

const ControllerPosts = {
  //Good//
  findAllPost: function (req, res, next) {
    Posts.findAllPost(req.body)
    .then(result => {
      res.status(200).json(result);})
    .catch(error => {
        res.status(500).json({
            message: 'erreur'
        });
    });
  },

  findByPost: function (req, res, next) {
    Posts.findAllComment(req.params.id)
    .then(result => {
      res.status(200).json(result);})
    .catch(error => {
        res.status(500).json({
            message: 'erreur'
        });
    });
  }, 

  //Good//
  addPost: async function (req, res, next) {
    console.log(req.body);
    const post =  await Posts.createPost(req.body, {
    imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    });
    const id = post.insertId
    console.log(id);
    const Newpost = await Posts.findOne(id);
    res.send(Newpost);
  },

  deletePost: function (req, res, next) {
    Posts.deletePost({id_post: req.params.id})
      .then(() => res.status(200).json({ message: 'Post supprimé !'}))
      .catch(error => res.status(400).json({ error }));
  },

  addComment: async function (req, res, next) {
    console.log(req.body);
    const comment =  await Posts.createComment(req.body);
    const id = comment.insertId
    console.log(id);
    const Newcomment = await Posts.findOneComment(id);
    res.send(Newcomment);
  },

  deleteComment: function (req, res, next) {
    Posts.deleteComment({id_comment: req.params.id})
    .then(() => res.status(200).json({ message: 'Commentaire supprimé !'}))
    .catch(error => res.status(400).json({ error }));
  },
};

module.exports = ControllerPosts;