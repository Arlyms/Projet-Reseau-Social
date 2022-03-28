const database = require("./db");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const Users = {
  
  // Login 

  findOne: function (login, password) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM `users` WHERE login = ? AND password = ?;';

      const hashedPassword = Users.hashValue(password);
      database.query(query, [login, hashedPassword], (err, results, fields) => {
        if (err) {
          console.log("Erreur Serveur");
          reject(500);
        }

        if (results.length > 0) resolve(results[0]);
        else reject(404);
      });
    });
  },

  // Signup

  insert: function (userData) {
    return new Promise((resolve, reject) => {
      const query =
        'INSERT INTO `users` (firstName, name, login, password) VALUES (?, ?, ?, ?);';
      const hashedPassword = Users.hashValue(userData.password);
      database.query(
        query,
        [userData.firstName, userData.name, userData.login, hashedPassword],
        (err, results, fields) => {
          if (err) {
            console.log("Erreur !!");
            reject();
          }
          else{
          resolve(results);
          };
        }
      );
    });
  },

  // Delete

  delete: function (userId){
    console.log(userId);
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM `users` WHERE id_user = ?;';
      database.query(query,userId.id_user,
      (err, results, fields) => {
          if (err) reject(err);
          else resolve(results);
      });
    }
  )},

  // Show my profile

  myProfil: function (userId) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT firstName, name, login, pictureProfile FROM users WHERE id_user = ? ;';
      console.log(userId);
      database.query(
          query,userId, 
          (err, results, fields) => { // fields ? 
          if (err) {
            console.log(err);
            reject();
          }
          resolve(results);
        });
    });
  },

  //

  hashValue: function (value) {
    const hash = crypto.createHash("sha512");
    hash.update(value);
    return hash.digest("hex");
  },
};

module.exports = Users;
