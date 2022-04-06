//Regex Mot de passe

const passwordValidator = require('password-validator');

const schema = new passwordValidator();

schema
.is().min(6)                                    // Minimum length 6
.is().max(20)                                  // Maximum length 20
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(1)                                // Must have at least 1 digits
.has().not().spaces()                           // Should not have spaces

module.exports = (req, res, next) => {
    if(schema.validate(req.body.password)){
        return next();
    } else {
        return res.status(400).json({error: "mot de passe invalide !" })
    }
};