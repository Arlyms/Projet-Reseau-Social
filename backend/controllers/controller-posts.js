const Posts = require("../dao/dao-posts");

const ControllerPosts = {
  
  findAllPost: async function (req, res, next) {
    console.log(req.body);
    await Posts.findAllPost(req.body);
    res.send();
  },

  addPost: async function (req, res, next) {
    console.log(req.body);
    await Posts.createPost(req.body);
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

  findAllComment: async function (req, res, next) {
    console.log(req.body);
    await Posts.findAllComment(req.body);
    res.send();
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