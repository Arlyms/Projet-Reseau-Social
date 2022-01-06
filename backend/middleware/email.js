// Authentification du token 
module.exports = (req, res, next) => {
    const email = req.body.login;

    const regExp = new RegExp(/^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@groupomania.fr$/);

    if(regExp.test(email))
        next();
    else
        res.status(400).send();
};