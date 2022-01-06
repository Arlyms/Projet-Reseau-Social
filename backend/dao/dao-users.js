const database = require("./db");
const jwt = require("jsonwebtoken");
const mysql = require("mysql2");
const crypto = require("crypto");

const Users = {
  
  // Login 

  findOne: function (login, password) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM `user` WHERE login = ? AND password = ?;";

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
        "INSERT INTO `user` (name, login, password) VALUES (?, ?, ?);";

      const hashedPassword = Users.hashValue(userData.password);

      database.query(
        query,
        [userData.name, userData.login, hashedPassword],
        (err, results, fields) => {
          if (err) {
            console.log("Erreur !!");
            reject();
          }
          else{
          resolve();
          };
        }
      );
    });
  },

  // Modify 

  update: function (userData) {
    return new Promise((resolve, reject) => {
      const query ="UPDATE `user` SET name = ?, login = ?, pp = ? WHERE id = ?;";

      database.query(
        query,
        [userData.name, userData.login, userData.pp, userData.id],
        (err, results, fields) => {
          if (err) {
          reject({error : "Cette fonction est indisponible !"});
          }
          resolve({message : "Informations mises à jour !"});
        }
      );
    });
  },

  // Delete

  delete: function (userData) {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM `user` WHERE id = ?;";
      database.query(query,
        [userData.id],
        (err, results, fields) => {
          if (err) {
            console.log("Erreur !!");
            reject();
          }
          resolve(results);
        }
      );
    });
  },

  // Show my profile

  myProfil: function (userData) {
    return new Promise((resolve, reject) => {
      const query = "SELECT name, login, pictureProfil FROM `user` WHERE id = ?;";
        database.query(
          query,
          [userData.id], 
          (err, results, fields) => { // fields ? 
          if (err) {
            console.log("Erreur !!");
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
