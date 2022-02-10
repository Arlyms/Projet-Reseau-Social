const database = require("./db");
const jwt = require("jsonwebtoken");
const mysql = require("mysql2");


const Posts = {

    findAllPost: function () {
        return new Promise((resolve, reject) => {
          const query = 'SELECT *,DATE_FORMAT(date,"%y %b %d à %k:%i") AS date FROM posts p, users u WHERE p.id_user = u.id_user ORDER BY p.date DESC';
          //*'SELECT *,DATE_FORMAT(date,"%y %b %d à %k:%i") AS date FROM posts p, users u WHERE p.id_user = u.id_user ORDER BY p.date DESC';
          //*'SELECT posts.id_post, posts.id_user, DATE_FORMAT((p.date), "%y %b %d à %k:%i"), posts.content, users.name, users.pictureProfile FROM posts JOIN users ON posts.id_user = users.id_user ORDER BY posts.date DESC;'; **/
          database.query(query,(err, posts, fields) => {
            if (err) { 
              console.log("Erreur Serveur");
              reject(500);
            } else {
            for (let i = 0; i < posts.length; i++) {
              const query2 = 'SELECT c.* FROM comments c, posts p WHERE c.id_post = p.id_post = ' + posts[i].id_post;
              database.query(query2,(err, comments, fields) => {
              if (err) { 
              console.log("Erreur Serveur");
              } else {
              posts.comments = comments;
              console.log(posts.comments);
              }
            });
            }
            resolve(posts);
            }
          });
        });
    },

    createPost: function (postData) {
        return new Promise((resolve, reject) => {
          const query = 'INSERT INTO `posts` (content, date, id_user, id_like) VALUES (?,?,?,?)';
          // Contenu : le message / la date / l'id de l'auteur / le nombre de like
          database.query(query,[postData.content, postData.date, postData.id_user, postData.id_like],(err, results, fields) => {
            if (err) throw err;
            console.log(results, {message : "Nouveau Post !"});
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

  /*  findAllComment: function () {
        return new Promise((resolve, reject) => {
          //*'SELECT comments.id_comment, comments.id_user, comments.id_post, DATE_FORMAT((comments.date), "%y %b %d à %k:%i"), comments.content, users.name, users.pictureProfile FROM comments JOIN users ON comments.id_user = users.id_user ORDER BY comments.date DESC;';
          const query = 'SELECT * FROM comments c, users u WHERE c.id_user = u.id_user ORDER BY c.date DESC';
          database.query(query,(err, results, fields) => {
            if (err) { 
              console.log("Erreur Serveur");
            } else {
            }
          });
        });
    },
    */

    createComment: function (commentData) {
        return new Promise((resolve, reject) => {
          const query = 'INSERT INTO `comments` (content, DATE_FORMAT((date),"%y %b %d à %k:%i"), id_user, id_post) VALUES (?, ?, ? ,?);';
          
          database.query(query,[commentData.content, commentData.DATE_FORMAT, commentData.id_user, commentData.id_post],(err, results, fields) => {
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

    findAllLikes: function (likeData) {
        return new Promise((resolve, reject) => {
          const query = 'SELECT * FROM likes';
          
          database.query(query,(err, results, fields) => {
            if (err) throw err;
            resolve(results);
          });
        });
    },

    likeDislike: function () {
        return new Promise((resolve, reject) => {
          const query = "";
          
          database.query(query,[],(err, results, fields) => {
            if (err) throw err;
            resolve(results);
          });
        });
    },
    
};

module.exports = Posts;