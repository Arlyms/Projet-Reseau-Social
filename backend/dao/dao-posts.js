//Sommaire
//Récupération de tout les posts
//Récupération d'un seul post
//Récupération de tout les comentaires avec l'id d'un post
//Créer un nouveau post 
//Créer un nouveau commentaire
//Supprimer un post
//Supprimer un commentaire


const database = require("./db");
const jwt = require("jsonwebtoken");
const mysql = require("mysql2");


const Posts = {

//Récupération de tout les posts
    findAllPost: function () {
      return new Promise((resolve, reject) => {
        database.query('SELECT *,0 AS showw, DATE_FORMAT(date,"%y %b %d à %k:%i") AS date FROM posts p, users u WHERE p.id_user = u.id_user ORDER BY p.date DESC', 
        function (err, posts, fields) {
            if (err) reject(err);
            else resolve(posts);    
        });
      } 
    )},

//Récupération d'un seul post
    findOne: function (id) {
      return new Promise((resolve, reject) => {
        database.query('SELECT *,0 AS showw, DATE_FORMAT(date,"%y %b %d à %k:%i") AS date FROM posts p, users u WHERE p.id_user = u.id_user AND id_post = ' + id, 
        function (err, posts, fields) {
            if (err) reject(err);
            else resolve(posts);    
        });
      } 
    )},

//Récupération d'un seul commentaire
    findOneComment: function (id) {
      return new Promise((resolve, reject) => {
        database.query('SELECT *, DATE_FORMAT(date,"%y %b %d %k:%i") AS date FROM comments, users u WHERE comments.id_user = u.id_user AND id_comment = ' + id, 
        function (err, comment, fields) {
            if (err) reject(err);
            else resolve(comment);    
        });
      } 
    )},

//Récupération de tout les commentaires avec l'id d'un post    
    findAllComment: function (id) {
        return new Promise((resolve, reject) => {
          database.query('SELECT *, DATE_FORMAT(date,"%y %b %d %k:%i") AS date FROM comments, users WHERE comments.id_user = users.id_user AND comments.id_post = ' + id, 
          function (err, comments, fields) {
            if (err) reject(err);
            else resolve(comments);
        });
      }
    )},

//Créer un nouveau post    
    createPost: function (postData, imageUrl) {
        return new Promise((resolve, reject) => {
          const query = 'INSERT INTO `posts` (content, id_user, imageUrl) VALUES (?,?,?)';
          // Contenu : le message / la date / l'id de l'auteur / le nombre de like
          database.query(query,[postData.content, postData.id_user, imageUrl.imageUrl],(err, results, fields) => {
            if (err) throw err;
            resolve(results);
          });
        });
    },

//Créer un nouveau commentaire
    createComment: function (commentData) {
      return new Promise((resolve, reject) => {
        const query = 'INSERT INTO `comments` (content, id_user, id_post) VALUES ( ?, ? ,?);';
        database.query(query,[commentData.content, commentData.id_user, commentData.id_post],(err, results, fields) => {
          if (err) throw err;
          resolve(results);
        });
      });
  },

//Supprimer un post
    deletePost: function (postData) {
      console.log(postData);
        return new Promise((resolve, reject) => {
          const query = 'DELETE FROM `posts` WHERE id_post = ?';
          database.query(query,[postData.id_post],(err, results, fields) => {
            if (err) throw err;
            resolve(results);
          });
        });
    },

//Supprimer un commentaire   
    deleteComment: function (commentData) {
      console.log(commentData);
        return new Promise((resolve, reject) => {
          const query = 'DELETE FROM `comments` WHERE id_comment = ?';
          database.query(query,[commentData.id_comment],(err, results, fields) => {
            if (err) throw err;
            resolve(results);
          });
        });
    },  
};

module.exports = Posts;