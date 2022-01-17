const Users = require("../dao/dao-users");

const ControllerUsers = {
  
  addUser: async function (req, res, next) {
    console.log(req.body);
    await Users.insert(req.body);
    res.send();
  },

  showUser: async function (req, res, next) {
    console.log(req.body);
    await Users.myProfil(req.body);
    res.send();
  },

  login: async function (req, res, next) {
    try {
      const user = await Users.findOne(req.body.login, req.body.password);
      res.status(200).send("Connecté !");
    } catch (exception) {
      res.status(exception).send("Erreur");
    }
  },

  validatetoken :async function (req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1]; // récupération du token 
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
      const userId = decodedToken.userId;
      req.auth = { userId };
      if (req.body.userId && req.body.userId !== userId) {
        throw 'Invalid user ID';
      } else {
        next();
      }
    } catch {
      res.status(401).json({
        error: new Error('Invalid request!')
      });
    }
  },

  updateUser: async function (req, res, next) {
    try {
      const user = await Users.update(req.body);
      res.status(200).send();
    } catch (exception) {
      res.status(exception).send();
    }
  },

  deleteUser: async function (req, res, next) {
    try {
      const user = await Users.delete(req.body);
      res.status(200).send();
    } catch (exception) {
      res.status(exception).send();
    }
  },
};

module.exports = ControllerUsers;
