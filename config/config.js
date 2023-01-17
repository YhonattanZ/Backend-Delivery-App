const mysql = require('mysql');
//Crea la conexion con la base de datos, los datos para crear la conexion es nombre del host, nombre del usuario en la DB, contrasena y nombre de la DB a usar
const db = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: 'Haikyuu19.',
    database: 'delivery'
});

db.connect((err)=>{
if(err) throw err;
console.log('Base de datos conectada');
});

module.exports = db;