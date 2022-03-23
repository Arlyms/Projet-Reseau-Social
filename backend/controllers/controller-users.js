const Users = require("../dao/dao-users");
const jwt = require("jsonwebtoken");

const ControllerUsers = {
  
  addUser: async function (req, res, next) {
    console.log(req.body);
    await Users.insert(req.body);
    res.send();
  },

  showUser: async function (req, res, next) {
    console.log(req.auth);
    const user = await Users.myProfil(req.auth.userId);
    res.status(200).json(user);
  },

  login: async function (req, res, next) {
    try {
      const user = await Users.findOne(req.body.login, req.body.password);
      res.status(200).json({
        userId: user.id_user,
        firstName:  user.firstName,
        name: user.name,
        email: user.login,
        token: jwt.sign(
          { userId: user.id_user},
          'SECRET_KEY',
          { expiresIn: '24h' }
        )
      });
    } catch (exception) {
      res.status(exception).send("Erreur");
    }
  },
  deleteUser: function (req, res, next) {
    Users.deleteUser({id_user: req.auth.userId})
      .then(() => res.status(200).json({ message: 'Utilisateur supprimé !'}))
      .catch(error => res.status(400).json({ error }));
  },
};

module.exports = ControllerUsers;
