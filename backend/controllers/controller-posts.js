//Sommaire
//Récupération de tout les posts
//Récupération des commentaires d'un post
//Ajouter un post (avec ou sans image)
//Supprimer un post (avec son image)
//Ajouter un commentaire
//Supprimer un commentaire

const Posts = require("../dao/dao-posts");
const fs = require ("fs");
const { post } = require("../routes/post.routes");

const ControllerPosts = {

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

  addPost: async function (req, res, next) {
    console.log(req.body);
    const post =  await Posts.createPost(req.body, {
    imageUrl: req.file ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`: '',
    });
    const id = post.insertId
    const Newpost = await Posts.findOne(id);
    res.send(Newpost);
  },

  deletePost: async function (req, res, next) {
    const post = await Posts.findOne(req.params.id);
    if (post[0].id_user == req.auth.userId || req.auth.admin){
      if (post[0].imageUrl) {
        const filename = post[0].imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`,() => {
          Posts.deletePost({id_post: req.params.id});
          res.status(200).json({message: 'Post supprimé'});
        });  
      } else {
        Posts.deletePost({id_post: req.params.id})
        res.status(200).json({message: 'Post supprimé'});
      }    
    }  
  },

  addComment: async function (req, res, next) {
    console.log(req.body);
    const comment =  await Posts.createComment(req.body);
    const id = comment.insertId
    const Newcomment = await Posts.findOneComment(id);
    res.send(Newcomment);
  },

  deleteComment: async function (req, res, next) {
    const comment = await Posts.findOneComment(req.params.id);
    if (comment[0].id_user == req.auth.userId || req.auth.admin){
        Posts.deleteComment({id_comment: req.params.id})
        res.status(200).json({message: 'Post supprimé'});
      }    
  },
};

module.exports = ControllerPosts;