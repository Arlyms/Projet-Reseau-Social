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

//Récupération de tout les comentaires avec l'id d'un post    
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
    createPost: function (postData) {
        return new Promise((resolve, reject) => {
          const query = 'INSERT INTO `posts` (content, id_user) VALUES (?,?)';
          // Contenu : le message / la date / l'id de l'auteur / le nombre de like
          database.query(query,[postData.content, postData.id_user],(err, results, fields) => {
            if (err) throw err;
            console.log(results);
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

    updatePost: function (postData) {
        return new Promise((resolve, reject) => {
          const query = 'UPDATE `posts` SET content = ? WHERE id_post = ? AND id_user = ?;';
          // modification du contenu du post
          database.query(query,[postData.content, postData.id_post , postData.id_user],(err, results, fields) => {
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

    updateComment: function (commentData) {
        return new Promise((resolve, reject) => {
          const query = 'UPDATE `comments` SET content = ? WHERE id_comment = ? AND id_user = ? AND id_post = ?;';
          
          database.query(query,[commentData.content, commentData.id_comment, commentData.id_user, commentData.id_post],(err, results, fields) => {
            if (err) throw err;
            resolve(results);
          });
        });
    },

    deleteComment: function (commentData) {
        return new Promise((resolve, reject) => {
          const query = 'DELETE FROM `posts` WHERE id_post = ?';
          
          database.query(query,[commentData.id_post],(err, results, fields) => {
            if (err) throw err;
            resolve(results);
          });
        });
    },
};

module.exports = Posts;