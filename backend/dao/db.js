const mysql = require('mysql2');
console.log('Connexion à la base de données...');
const database = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'aTY8>Vu4pGz85T~m)&2!',
    database: 'groupomania'
});

database.connect(function(err) { 
  if (err) throw err;
  console.log('Connecté!')
});  


module.exports = database;  

