//Sommaire (FR)
//Ajouter un utilisateur
//Connection au site / assignation d'un token
//Afficher un utilisateur
//Ajouter une Photo de profil
//Supprimer un utilisateur (avec sa photo de profil)

const Users = require("../dao/dao-users");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const ControllerUsers = {
  
  addUser: async function (req, res, next) {
    await Users.insert(req.body);
    res.send();
  },

  login: async function (req, res, next) {
    try {
      const user = await Users.findOne(req.body.login, req.body.password);
      res.status(200).json({
        userId: user.id_user,
        firstName:  user.firstName,
        name: user.name,
        email: user.login,
        admin: user.admin,
        pictureProfile: user.pictureProfile,
        token: jwt.sign(
          { userId: user.id_user,
            admin: user.admin},
          'SECRET_KEY',
          { expiresIn: '24h' }
        )
      });
    } catch (exception) {
      res.status(exception).send("Erreur");
    }
  },

  showUser: async function (req, res, next) {
    const user = await Users.myProfil(req.auth.userId);
    res.status(200).json(user);
  },
  
  addPp: async function (req, res, next) {
    const user = await Users.myProfil(req.auth.userId);
    if (user[0].pictureProfile) {
      fs.unlink(`images/${user[0].pictureProfile.split('/images/')[1]}`,() => {
        const user =  Users.addPp(req.body, {
        pictureProfile: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`})
        res.status(200).json({pictureProfile: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`});
      });
    } else {
      const user = await Users.addPp(req.body, {
      pictureProfile: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`})
      res.status(200).json({pictureProfile: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`});
    }
  },

  deleteUser: async function (req, res, next) {
    const user = await Users.myProfil(req.auth.userId);
    if (user[0].pictureProfile) {
      const filename = user[0].pictureProfile.split('/images/')[1];
      fs.unlink(`images/${filename}`,() => {
        Users.delete({id_user: req.auth.userId});
        res.status(200).json({message: 'Utilisateur supprimé'});
      });  
    } else {
      Users.delete({id_user: req.auth.userId})
      res.status(200).json({message: 'Utilisateur supprimé'});
    } 
  },
};

module.exports = ControllerUsers;
