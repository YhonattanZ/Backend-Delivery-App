const db = require('../config/config');
const bcrypt = require('bcryptjs');
const User = {};
//Encontrar usuario por ID
User.findById = (id, result) => {
    const sql = 
    `
    SELECT
        id,
        email,
        name,
        lastname,
        image,
        phone,
        password
    FROM
        users
    WHERE
        id = ?
    `;

    db.query(
        sql,
        [id],
        (err,res) =>{
            if(err){
                console.log('Error:', err)
                result(err,null);
            }
            else{
                console.log('Usuario:', res);
                result(err, res);
            }
        },
        )
}

//Encontrar usuario por Email
User.findByEmail = (email, result) => {
    const sql = 
    `
    SELECT
        id,
        email,
        name,
        lastname,
        image,
        phone,
        password
    FROM
        users
    WHERE
        email = ?
    `;

    db.query(
        sql,
        [email],
        (err,res) =>{
            if(err){
                console.log('Error:', err)
                result(err,null);
            }
            else{
                console.log('Usuario:', res[0]);
                result(err, res[0]);
            }
        },
        )
}

//Crear usuario
User.create = async (user, result) => {
    //Encriptar contrasena del usuario
    const hash = await bcrypt.hash(user.password, 10); 
    const sql = `
    INSERT INTO 
        users(
            email,
            name,
            lastname,
            phone,
            image,
            password,
            created_at,
            updated_at
        )
    VALUES(?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query
    (
        sql,
        [
            user.email,
            user.name,
            user.lastname,
            user.phone,
            user.image,
            user.password,
            new Date(),
            new Date()
        ],
        (err,res) =>{
            if(err){
                console.log('Error:', err)
                result(err,null);
            }
            else{
                console.log('ID del usuario:', res.insertId);
                result(err, res.insertId);
            }
        }

    )
}

module.exports = User;