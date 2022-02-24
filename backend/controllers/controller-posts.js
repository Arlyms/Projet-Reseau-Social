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
    Posts.findAllComment(req.body)
    .then(result => {
      res.status(200).json(result);})
    .catch(error => {
        res.status(500).json({
            message: 'erreur'
        });
    });
  }, 

  //Good//
  addPost: function (req, res, next) {
    console.log(req.body);
    Posts.createPost(req.body);
    res.send("Nouveau Post !");
  },

  updatePost: async function (req, res, next) {
    try {
        const Posts = await Posts.updatePost(req.body);
        res.status(200).send();
    } catch (exception) {
    res.status(exception).send("Post modifié !");
    }
  },

  deletePost: async function (req, res, next) {
    try {
        const Posts = await Posts.deletePost(req.body);
        res.status(200).send();
    } catch (exception) {
    res.status(exception).send("Post supprimé !");
    }
  },

  addComment: async function (req, res, next) {
    console.log(req.body);
    await Posts.createComment(req.body);
    res.send("Nouveau Commentaire !");
  },

  updateComment: async function (req, res, next) {
    try {
        const Posts = await Posts.updateComment(req.body);
        res.status(200).send();
    } catch (exception) {
    res.status(exception).send("Commentaire modifié !");
    }
  },

  deleteComment: async function (req, res, next) {
    try {
        const Posts = await Posts.deleteComment(req.body);
        res.status(200).send();
    } catch (exception) {
    res.status(exception).send("Commentaire supprimé !");
    }
  },

// Voir likes avec charles // 

};

module.exports = ControllerPosts;