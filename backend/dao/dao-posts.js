const database = require("./db");
const jwt = require("jsonwebtoken");
const mysql = require("mysql2");

const Posts = {

    findAllPost: function () {
        return new Promise((resolve, reject) => {
          const query = 
          'SELECT posts.id_post, posts.id_user, DATE_FORMAT((posts.date), "%y %b %d à %k:%i"), posts.content, users.name, users.pictureProfile FROM posts JOIN users ON posts.id_user = users.id_user ORDER BY posts.date DESC;';
          database.query(query,(err, results, fields) => {
            if (err) throw err;
            resolve(results);
          });
        });
    },

    createPost: function (postData) {
        return new Promise((resolve, reject) => {
          const query = 'INSERT INTO `posts` (content, DATE_FORMAT((date),"%y %b %d à %k:%i"), id_user, id_like) VALUES (?, ?, ? ,?);';
          // Contenu : le message / la date / l'id de l'auteur / le nombre de like
          database.query(query,[postData.content, postData.DATE_FORMAT, postData.id_user, postData.id_like],(err, results, fields) => {
            if (err) throw err;
            resolve(results, {message : "Informations mises à jour !"});
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

    findAllComment: function () {
        return new Promise((resolve, reject) => {
          const query ='SELECT comments.id_comment, comments.id_user, comments.id_post, DATE_FORMAT((comments.date), "%y %b %d à %k:%i"), comments.content, users.name, users.pictureProfile FROM comments JOIN users ON comments.id_user = users.id_user ORDER BY comments.date DESC;';
          
          database.query(query,(err, results, fields) => {
            if (err) throw err;
            resolve(results);
          });
        });
    },

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