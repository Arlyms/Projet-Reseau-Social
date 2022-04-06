//Sommaire (FR)
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

  findAllPost: function () {
    return new Promise((resolve, reject) => {
      database.query('SELECT *,0 AS showw, DATE_FORMAT(date,"%y %b %d à %k:%i") AS date FROM posts p, users u WHERE p.id_user = u.id_user ORDER BY p.date DESC', 
      function (err, posts, fields) {
          if (err) reject(err);
          else resolve(posts);    
      });
    } 
  )},

  findOne: function (id) {
    return new Promise((resolve, reject) => {
      database.query('SELECT *,0 AS showw, DATE_FORMAT(date,"%y %b %d à %k:%i") AS date FROM posts p, users u WHERE p.id_user = u.id_user AND id_post = ' + id, 
      function (err, posts, fields) {
          if (err) reject(err);
          else resolve(posts);    
      });
    } 
  )},

  findOneComment: function (id) {
    return new Promise((resolve, reject) => {
      database.query('SELECT *, DATE_FORMAT(date,"%y %b %d %k:%i") AS date FROM comments, users u WHERE comments.id_user = u.id_user AND id_comment = ' + id, 
      function (err, comment, fields) {
          if (err) reject(err);
          else resolve(comment);    
      });
    } 
  )},

  findAllComment: function (id) {
      return new Promise((resolve, reject) => {
        database.query('SELECT *, DATE_FORMAT(date,"%y %b %d %k:%i") AS date FROM comments, users WHERE comments.id_user = users.id_user AND comments.id_post = ' + id, 
        function (err, comments, fields) {
          if (err) reject(err);
          else resolve(comments);
      });
    }
  )},
  
  createPost: function (postData, imageUrl) {
      return new Promise((resolve, reject) => {
        const query = 'INSERT INTO `posts` (content, id_user, imageUrl) VALUES (?,?,?)';
        database.query(query,[postData.content, postData.id_user, imageUrl.imageUrl],(err, results, fields) => {
          if (err) throw err;
          resolve(results);
        });
      });
  },

  createComment: function (commentData) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO `comments` (content, id_user, id_post) VALUES ( ?, ? ,?);';
      database.query(query,[commentData.content, commentData.id_user, commentData.id_post],(err, results, fields) => {
        if (err) throw err;
        resolve(results);
      });
    });
},

  deletePost: function (postData) {
      return new Promise((resolve, reject) => {
        const query = 'DELETE FROM `posts` WHERE id_post = ?';
        database.query(query,[postData.id_post],(err, results, fields) => {
          if (err) throw err;
          resolve(results);
        });
      });
  },

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