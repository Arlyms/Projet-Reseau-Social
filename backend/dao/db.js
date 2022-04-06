const mysql = require('mysql2');

console.log('Connexion à la base de données...');
const database = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.CONNEXION_STRING,
    database: 'groupomania'
});

database.connect(function(err) { 
  if (err) throw err;
  console.log('Connecté!')
});  


module.exports = database;  

